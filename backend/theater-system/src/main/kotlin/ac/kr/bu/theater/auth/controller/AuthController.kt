package ac.kr.bu.theater.auth.controller

import ac.kr.bu.theater.auth.dto.RefreshTokenRequest
import ac.kr.bu.theater.auth.dto.TokenResponse
import ac.kr.bu.theater.auth.dto.UserLoginRequest
import ac.kr.bu.theater.auth.dto.UserPrincipal
import ac.kr.bu.theater.auth.service.RedisTokenService
import ac.kr.bu.theater.jwt.JwtTokenProvider
import ac.kr.bu.theater.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController (
    private val userService: UserService,
    private val jwtTokenProvider: JwtTokenProvider,
    private val redisTokenService: RedisTokenService
) {
    @PostMapping("/login")
    fun login(@RequestBody reqeust: UserLoginRequest): ResponseEntity<TokenResponse> {
        val token = userService.login(reqeust)
        return ResponseEntity.ok(token)
    }

    @PostMapping("/logout")
    fun logout(@AuthenticationPrincipal user: UserPrincipal): ResponseEntity<Unit> {
        redisTokenService.deleteAccessToken(user.id)
        redisTokenService.deleteRefreshToken(user.id)

        return ResponseEntity.noContent().build()
    }

    @PostMapping("/reissue")
    fun reissueToken(@RequestBody request: RefreshTokenRequest)
    : ResponseEntity<TokenResponse> {
        val refreshToken = request.refreshToken

        // 유효성 검사
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
        val userId = jwtTokenProvider.getUserId(refreshToken)

        // Redis에서 refreshToken 일치 여부 확인
        val storedToken = redisTokenService.getRefreshToken(userId)
        if (storedToken != refreshToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }

        // 새로운 AccessToken 발급
        val newAccessToken = jwtTokenProvider.createAccessToken(userId)
        redisTokenService.saveAccessToken(userId, newAccessToken, jwtTokenProvider.getAccessExpiration())

        return ResponseEntity.ok(TokenResponse(newAccessToken, refreshToken))
    }
}