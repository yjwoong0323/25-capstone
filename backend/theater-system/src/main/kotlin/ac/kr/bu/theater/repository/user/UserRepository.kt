package ac.kr.bu.theater.repository.user

import ac.kr.bu.theater.domain.user.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): User
    fun existsByEmail(email: String): Boolean
    fun existsByStudentNo(studentNo: String): Boolean
    fun findByStudentNo(studentNo: String): User
}
