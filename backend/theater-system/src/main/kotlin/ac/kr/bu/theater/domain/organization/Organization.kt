package ac.kr.bu.theater.domain.organization

import ac.kr.bu.theater.domain.user.User
import jakarta.persistence.*
import java.time.LocalDateTime

enum class OrganizationType {
    DEPT,
    CLUB,
    ETC
}

@Entity
@Table(name = "organizations")
class Organization(
    @Column(nullable = false, length = 200)
    var name: String,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var type: OrganizationType,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_user_id")
    var owner: User? = null,
    
    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

