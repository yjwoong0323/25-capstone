package ac.kr.bu.theater.util

import org.junit.jupiter.api.Test
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

class PasswordHashTest {

    @Test
    fun generatePasswordHash() {
        val encoder = BCryptPasswordEncoder()
        val hash = encoder.encode("1234")
        println("BCrypt Hash = $hash")
    }
}
