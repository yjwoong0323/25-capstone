package ac.kr.bu.theater.service.ticket

import ac.kr.bu.theater.domain.event.Ticket
import ac.kr.bu.theater.domain.event.TicketStatus
import ac.kr.bu.theater.domain.event.ApprovalStatus
import ac.kr.bu.theater.dto.ticket.TicketCreateRequest
import ac.kr.bu.theater.repository.event.EventScheduleRepository
import ac.kr.bu.theater.repository.event.TicketRepository
import ac.kr.bu.theater.repository.event.TicketTypeRepository
import ac.kr.bu.theater.repository.user.UserRepository
import ac.kr.bu.theater.repository.venue.SeatRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TicketServiceImpl(
    private val ticketRepository: TicketRepository,
    private val scheduleRepository: EventScheduleRepository,
    private val ticketTypeRepository: TicketTypeRepository,
    private val seatRepository: SeatRepository,
    private val userRepository: UserRepository
) : TicketService {

    override fun reserveTicket(
        request: TicketCreateRequest,
        userId: Long
    ): Ticket {

        val user = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("유저를 찾을 수 없습니다.") }

        val schedule = scheduleRepository.findById(request.scheduleId)
            .orElseThrow { IllegalArgumentException("회차를 찾을 수 없습니다.") }

        val event = schedule.event
            ?: throw IllegalStateException("이벤트 정보가 없습니다.")

        // ✅ 승인된 이벤트만 예매 가능
        if (event.approvalStatus != ApprovalStatus.APPROVED) {
            throw IllegalStateException("승인되지 않은 이벤트는 예매할 수 없습니다.")
        }

        // ✅ 잔여 수량 체크
        if (schedule.capacity <= 0) {
            throw IllegalStateException("매진된 회차입니다.")
        }

        val ticketType = ticketTypeRepository.findById(request.ticketTypeId)
            .orElseThrow { IllegalArgumentException("티켓 타입을 찾을 수 없습니다.") }

        val seat = request.seatId?.let { seatId ->
            seatRepository.findById(seatId)
                .orElseThrow { IllegalArgumentException("좌석을 찾을 수 없습니다.") }
        }

        // ✅ 좌석 중복 예매 방지
        if (seat != null &&
            ticketRepository.existsBySchedule_IdAndSeat_Id(schedule.id!!, seat.id!!)
        ) {
            throw IllegalStateException("이미 예매된 좌석입니다.")
        }

        // ✅ 수량 감소
        schedule.capacity -= 1

        val ticket = Ticket(
            user = user,
            schedule = schedule,
            ticketType = ticketType,
            seat = seat,
            status = TicketStatus.VALID,
            expiredAt = schedule.endsAt
        )

        return ticketRepository.save(ticket)
    }
}
