package ac.kr.bu.theater.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

/**
 * Spring Security 설정 클래스
 * TODO: OAuth2 및 JWT 설정 추가 필요
 * 현재는 개발용으로 모든 요청 허용
 */
@Configuration
@EnableWebSecurity
class SecurityConfig {
    
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }  // 개발 중 CSRF 비활성화
            .authorizeHttpRequests { auth ->
                auth.anyRequest().permitAll()  // 모든 요청 허용 (개발용)
            }
        return http.build()
    }
}

