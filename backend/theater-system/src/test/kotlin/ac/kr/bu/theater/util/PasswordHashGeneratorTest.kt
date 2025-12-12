package ac.kr.bu.theater.util

import org.junit.jupiter.api.Test

/**
 * 비밀번호 해시 생성 테스트
 * 
 * 이 테스트를 실행하여 BCrypt 해시를 생성하고 data.sql에 복사하세요.
 */
class PasswordHashGeneratorTest {
    
    @Test
    fun generatePasswordHashes() {
        val encoder = PasswordEncoderUtil
        
        // data.sql에 있는 비밀번호들
        val passwords = mapOf(
            "이재웅" to "9874",
            "조민서" to "1234",
            "송종욱" to "1234"
        )
        
        println("\n=== BCrypt 해시 생성 결과 ===")
        println()
        
        passwords.forEach { (name, password) ->
            val hash = encoder.encode(password)
            println("-- $name (비밀번호: $password)")
            println("-- 해시: $hash")
            println()
        }
        
        println("위 해시값을 data.sql의 password_hash 컬럼에 복사하세요.")
    }
}







