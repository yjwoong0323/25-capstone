package ac.kr.bu.theater.service

import ac.kr.bu.theater.auth.dto.TokenResponse
import ac.kr.bu.theater.auth.dto.UserLoginRequest
import ac.kr.bu.theater.auth.service.RedisTokenService
import ac.kr.bu.theater.domain.user.User
import ac.kr.bu.theater.dto.UserMeResponse
import ac.kr.bu.theater.dto.UserSignupRequest
import ac.kr.bu.theater.dto.UserSignupResponse
import ac.kr.bu.theater.jwt.JwtTokenProvider
import ac.kr.bu.theater.repository.user.UserRepository
import jakarta.transaction.Transactional
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserServiceImpl (
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtTokenProvider: JwtTokenProvider,
    private val redisTokenService: RedisTokenService
) : UserService{
    @Transactional
    override fun createUser(request: UserSignupRequest): UserSignupResponse {
        val user = User(
            name = request.name,
            email = request.email,
            phone = request.phone,
            passwordHash = passwordEncoder.encode(request.password)
        )

        val savedUser = userRepository.save(user)

        return UserSignupResponse(
            id = savedUser.id ?: throw Exception("FAILED_TO_CREATE_USER"),
            email = savedUser.email,
            name = savedUser.name,
            phone = savedUser.phone,
            status = savedUser.status,
            enrolledStudent = savedUser.enrolledStudent,
            createdAt = savedUser.createdAt,
        )
    }

    override fun login(request: UserLoginRequest): TokenResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw Exception("USER_NOT_FOUND")

        if (!passwordEncoder.matches(request.password, user.passwordHash)) {
            throw Exception("INCORRECT_PASSWORD")
        }

        // Token 생성
        val accessToken = jwtTokenProvider.createAccessToken(user.id!!)
        val refreshToken = jwtTokenProvider.createRefreshToken(user.id!!)

        // Redis 저장
        redisTokenService.saveAccessToken(user.id!!, accessToken, jwtTokenProvider.getAccessExpiration())
        redisTokenService.saveRefreshToken(user.id!!, refreshToken, jwtTokenProvider.getRefreshExpiration())

        return TokenResponse(accessToken, refreshToken)
    }

    override fun getMyInfo(userId: Long): UserMeResponse {
        val user = userRepository.findById(userId)
            .orElseThrow{ Exception("USER_NOT_FOUND") }

        return UserMeResponse(userId, user.email, user.name,
            user.phone, user.status, user.createdAt)
    }
}