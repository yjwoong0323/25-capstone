package ac.kr.bu.theater.config

import ac.kr.bu.theater.jwt.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }  // 개발 중 CSRF 비활성화
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authorizeHttpRequests { auth ->
                // 공개 엔드포인트 (비인증 허용 경로)
                // context-path가 /api이므로 실제 경로는 /user/signup, /auth/login 등
                auth.requestMatchers(
                    HttpMethod.POST,
                    "/user/signup",
                    "/auth/login",
                    "/auth/reissue",
                    "/account"
                ).permitAll()
                // 나머지는 인증 필요 (추후 구현)
                auth.anyRequest().permitAll()  // 개발용: 모든 요청 허용
            }
        return http.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}

