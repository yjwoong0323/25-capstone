package ac.kr.bu.theater.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

/**
 * Web 설정 클래스
 * CORS 설정 등
 */
@Configuration
class WebConfig : WebMvcConfigurer {
    
    override fun addCorsMappings(registry: CorsRegistry) {
        // context-path가 /api이므로 실제 경로는 /**로 매핑
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000") // React 개발 서버
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}

