package ac.kr.bu.theater.util

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

/**
 * 비밀번호 암호화 유틸리티
 * 
 * 사용 방법:
 * 1. 이 클래스를 실행하여 비밀번호 해시 생성
 * 2. 생성된 해시를 data.sql에 복사
 * 
 * 예시:
 * val encoder = PasswordEncoderUtil.getEncoder()
 * val hash = encoder.encode("9874")
 * println(hash)  // SQL에 사용할 해시값
 */
object PasswordEncoderUtil {
    
    private val encoder = BCryptPasswordEncoder()
    
    /**
     * 비밀번호를 BCrypt로 암호화
     */
    fun encode(password: String): String {
        return encoder.encode(password)
    }
    
    /**
     * 비밀번호 검증
     */
    fun matches(rawPassword: String, encodedPassword: String): Boolean {
        return encoder.matches(rawPassword, encodedPassword)
    }
}

