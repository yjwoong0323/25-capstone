package ac.kr.bu.theater.controller

import ac.kr.bu.theater.auth.dto.UserPrincipal
import ac.kr.bu.theater.dto.ticket.TicketCreateRequest
import ac.kr.bu.theater.service.ticket.TicketService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/tickets")
class TicketController(
    private val ticketService: TicketService
) {

    @PostMapping
    @PreAuthorize("hasRole('USER')") // ✅ ROLE_ 제거
    fun reserve(
        @RequestBody request: TicketCreateRequest,
        @AuthenticationPrincipal user: UserPrincipal
    ) = ticketService.reserveTicket(request, user.id)
}
