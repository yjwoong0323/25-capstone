package ac.kr.bu.theater.jwt

import ac.kr.bu.theater.auth.dto.UserPrincipal
import ac.kr.bu.theater.auth.service.RedisTokenService
import ac.kr.bu.theater.repository.user.UserRepository
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
class JwtAuthenticationFilter (
    private val jwtTokenProvider: JwtTokenProvider,
    private val redisTokenService: RedisTokenService,
    private val userRepository: UserRepository,
    tokenService: RedisTokenService
) : OncePerRequestFilter() { // 요청 당 한번만 실행되는 필터
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // 1. 요청 헤더에서 Authorization 헤더 추출
        val authHeader = request.getHeader("Authorization")
        val token = JwtHeaderUtil.extractBearerToken(authHeader)

        // 2. 헤더가 없거나 'Bearer'로 시작하지 않으면 다음 필터로 넘김
        if (token.isNullOrBlank() || !jwtTokenProvider.validateToken(token)) {
            filterChain.doFilter(request, response)
            return
        }

        // 3. JWT에서 userId 추출
        val userId = jwtTokenProvider.getUserId(token)

        // 4. Redis에 저장된 토큰과 비교
        val storedToken = redisTokenService.getAccessToken(userId)
        if (!redisTokenService.isSameToken(token, storedToken)) {
            filterChain.doFilter(request, response)
            return
        }

        // 5. DB에서 user 정보 조회
        val user = userRepository.findById(userId)
            .orElse(null) ?: run {
                filterChain.doFilter(request, response)
            return
        }

        // 6. UserPrincipal 생성
        val userPrincipal = UserPrincipal(user.id!!, user.name)

        // 7. 인증 객체 생성 (without UserDetails)
        val authorities = listOf(SimpleGrantedAuthority("인증 객체"))
        val authToken = UsernamePasswordAuthenticationToken(userPrincipal, null, authorities)
            .apply { details = WebAuthenticationDetailsSource().buildDetails(request) }

        // 8. 인증 객체를 SecurityContextHolder에 등록
        SecurityContextHolder.getContext().authentication = authToken

        // 9. 다음 필터로 넘기기
        filterChain.doFilter(request, response)

    }

}