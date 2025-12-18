package ac.kr.bu.theater.dto.ticket

data class TicketCreateRequest(
    val scheduleId: Long,
    val ticketTypeId: Long,
    val seatId: Long? = null
)
