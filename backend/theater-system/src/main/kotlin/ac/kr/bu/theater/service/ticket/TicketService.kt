package ac.kr.bu.theater.service.ticket

import ac.kr.bu.theater.domain.event.Ticket
import ac.kr.bu.theater.dto.ticket.TicketCreateRequest

interface TicketService {

    fun reserveTicket(
        request: TicketCreateRequest,
        userId: Long
    ): Ticket
}

