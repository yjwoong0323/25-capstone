package ac.kr.bu.theater.domain.user

import jakarta.persistence.*

@Entity
@Table(name = "user_roles")
@IdClass(UserRoleId::class)
class UserRole(
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,
    
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    var role: Role
)

data class UserRoleId(
    var user: Long = 0,
    var role: Long = 0
) : java.io.Serializable

