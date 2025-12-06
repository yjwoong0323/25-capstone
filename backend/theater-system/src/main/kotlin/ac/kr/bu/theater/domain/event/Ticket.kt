package ac.kr.bu.theater.domain.event

import ac.kr.bu.theater.domain.user.User
import ac.kr.bu.theater.domain.venue.Seat
import jakarta.persistence.*
import java.time.LocalDateTime

enum class TicketStatus {
    VALID,     // 유효
    CANCELLED, // 취소됨
    EXPIRED    // 만료됨
}

@Entity
@Table(
    name = "tickets",
    uniqueConstraints = [UniqueConstraint(name = "uq_tickets_schedule_seat", columnNames = ["schedule_id", "seat_id"])]
)
class Ticket(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false)
    var schedule: EventSchedule,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_type_id", nullable = false)
    var ticketType: TicketType,
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id")
    var seat: Seat? = null,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: TicketStatus = TicketStatus.VALID,
    
    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "expired_at", nullable = false)
    var expiredAt: LocalDateTime
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

