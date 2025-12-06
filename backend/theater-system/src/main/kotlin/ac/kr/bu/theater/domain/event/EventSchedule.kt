package ac.kr.bu.theater.domain.event

import jakarta.persistence.*
import java.time.LocalDateTime

enum class ScheduleStatus {
    ON_SALE,   // 판매 중
    CLOSED,    // 마감
    CANCELLED  // 취소됨
}

@Entity
@Table(name = "event_schedules")
class EventSchedule(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    var event: Event,
    
    @Column(name = "starts_at", nullable = false)
    var startsAt: LocalDateTime,
    
    @Column(name = "ends_at", nullable = false)
    var endsAt: LocalDateTime,
    
    @Column
    var capacity: Int? = null,
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var status: ScheduleStatus = ScheduleStatus.ON_SALE
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

