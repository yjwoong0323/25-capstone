package ac.kr.bu.theater.domain.user

import jakarta.persistence.*

@Entity
@Table(name = "roles")
class Role(
    @Column(nullable = false, length = 50, unique = true)
    var name: String
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

