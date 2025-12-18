package ac.kr.bu.theater.repository.event

import ac.kr.bu.theater.domain.event.Ticket
import ac.kr.bu.theater.domain.event.TicketStatus
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface TicketRepository : JpaRepository<Ticket, Long> {
    fun findByUser_Id(userId: Long, pageable: Pageable): Page<Ticket>
    fun findBySchedule_Id(scheduleId: Long): List<Ticket>
    fun findByStatus(status: TicketStatus, pageable: Pageable): Page<Ticket>
    fun findBySeat_Id(seatId: Long): List<Ticket>
    fun existsBySchedule_IdAndSeat_Id(scheduleId: Long, seatId: Long): Boolean
    fun findByExpiredAtBefore(now: LocalDateTime): List<Ticket>
    fun countBySchedule_IdAndStatus(scheduleId: Long, status: TicketStatus): Long

    
}
