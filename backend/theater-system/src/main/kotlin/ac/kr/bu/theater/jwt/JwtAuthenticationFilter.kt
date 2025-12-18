package ac.kr.bu.theater.jwt

import ac.kr.bu.theater.auth.dto.UserPrincipal
import ac.kr.bu.theater.auth.service.RedisTokenService
import ac.kr.bu.theater.repository.user.UserRepository
import ac.kr.bu.theater.repository.user.UserRoleRepository
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtTokenProvider: JwtTokenProvider,
    private val redisTokenService: RedisTokenService,

    // ✅ 반드시 UserRepository
    private val userRepository: UserRepository,

    // ✅ 권한 조회 전용
    private val userRoleRepository: UserRoleRepository
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
        val token = JwtHeaderUtil.extractBearerToken(authHeader)

        // 1) 토큰 없거나 검증 실패 → 인증 없이 통과
        if (token.isNullOrBlank() || !jwtTokenProvider.validateToken(token)) {
            filterChain.doFilter(request, response)
            return
        }

        // 2) 토큰에서 userId 추출
        val userId = jwtTokenProvider.getUserId(token)

        // 3) Redis 토큰 검증
        val storedToken = redisTokenService.getAccessToken(userId)
        if (!redisTokenService.isSameToken(token, storedToken)) {
            filterChain.doFilter(request, response)
            return
        }

        // 4) 사용자 조회 (User 엔티티)
        val user = userRepository.findById(userId).orElse(null)
        if (user == null) {
            filterChain.doFilter(request, response)
            return
        }

        val userPrincipal = UserPrincipal(
            user.id!!,
            user.name
        )

        // 5) 권한 조회 (문자열 기반, Lazy 문제 없음)
        val authorities = userRoleRepository.findRoleNamesByUserId(userId)
            .distinct()
            .map { SimpleGrantedAuthority("ROLE_$it") }

        val authToken = UsernamePasswordAuthenticationToken(
            userPrincipal,
            null,
            authorities
        ).apply {
            details = WebAuthenticationDetailsSource().buildDetails(request)
        }

        SecurityContextHolder.getContext().authentication = authToken
        filterChain.doFilter(request, response)
    }
}
