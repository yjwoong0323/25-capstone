package ac.kr.bu.theater.config

import ac.kr.bu.theater.jwt.JwtAuthenticationFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter
) {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {

        http
            // JWT 사용 → 기본 보안 기능 비활성화
            .csrf { it.disable() }
            .formLogin { it.disable() }
            .httpBasic { it.disable() }

            // 세션 사용 안 함
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }

            .authorizeHttpRequests { auth ->

                // ✅ 인증 없이 허용
                auth.requestMatchers(
                    HttpMethod.POST,
                    "/auth/login",
                    "/auth/reissue",
                    "/user/signup"
                ).permitAll()

                // ✅ 이벤트 조회는 공개
                auth.requestMatchers(
                    HttpMethod.GET,
                    "/events",
                    "/events/**"
                ).permitAll()

                // 🔒 나머지는 전부 인증 필요
                auth.anyRequest().authenticated()
            }

            // JWT 필터 등록
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter::class.java
            )

        return http.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}
