package ac.kr.bu.theater.domain.event

import jakarta.persistence.*

@Entity
@Table(name = "ticket_types")
class TicketType(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    var event: Event,
    
    @Column(nullable = false, length = 100)
    var name: String,
    
    @Column(name = "seated_required", nullable = false)
    var seatedRequired: Boolean = true,
    
    @Column(name = "quota_per_user", nullable = false)
    var quotaPerUser: Int,
    
    @Column(name = "total_quota", nullable = false)
    var totalQuota: Int,
    
    @Column(nullable = false)
    var valid: Boolean = true
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

