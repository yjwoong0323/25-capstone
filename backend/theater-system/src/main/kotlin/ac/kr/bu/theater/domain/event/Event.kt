package ac.kr.bu.theater.domain.event

import ac.kr.bu.theater.domain.organization.Organization
import ac.kr.bu.theater.domain.user.User
import ac.kr.bu.theater.domain.venue.Venue
import jakarta.persistence.*
import java.time.LocalDateTime

enum class EventType {
    PERFORMANCE,  // 공연
    EXHIBITION    // 전시
}

enum class ApprovalStatus {
    SUBMITTED,  // 제출됨
    APPROVED,   // 승인됨
    REJECTED    // 거부됨
}

@Entity
@Table(name = "events")
class Event(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "org_id", nullable = false)
    var organization: Organization,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var type: EventType,
    
    @Column(nullable = false, length = 200)
    var title: String,
    
    @Column(columnDefinition = "TEXT")
    var description: String? = null,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id")
    var venue: Venue? = null,
    
    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status", nullable = false)
    var approvalStatus: ApprovalStatus = ApprovalStatus.SUBMITTED,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    var approvedBy: User? = null,
    
    @Column(name = "approved_at")
    var approvedAt: LocalDateTime? = null,
    
    @Column(name = "visible_from", nullable = false)
    var visibleFrom: LocalDateTime,
    
    @Column(name = "visible_to", nullable = false)
    var visibleTo: LocalDateTime,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    var createdBy: User? = null,
    
    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "updated_at")
    var updatedAt: LocalDateTime? = null
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

