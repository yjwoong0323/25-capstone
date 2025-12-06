package ac.kr.bu.theater.domain.user

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
class User(
    @Column(nullable = false, length = 30)
    var name: String,
    
    @Column(name = "password_hash", nullable = false, length = 255)
    var passwordHash: String,
    
    @Column(nullable = false, length = 100, unique = true)
    var email: String,
    
    @Column(nullable = false, length = 30)
    var phone: String,
    
    @Column(name = "student_no", length = 30, unique = true)
    var studentNo: String? = null,
    
    @Column(name = "enrolled_student", nullable = false)
    var enrolledStudent: Boolean = false,

    @Column(name = "status", columnDefinition = "bit")
    var status: Boolean = true,
    
    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

