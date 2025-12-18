package ac.kr.bu.theater.controller

import ac.kr.bu.theater.auth.dto.UserPrincipal
import ac.kr.bu.theater.dto.event.EventApprovalRequest
import ac.kr.bu.theater.dto.event.EventCreateRequest
import ac.kr.bu.theater.service.event.EventService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/events")
class EventController(
    private val eventService: EventService
) {

    /**
     * 이벤트 등록 (담당자)
     */
    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    fun createEvent(
        @RequestBody request: EventCreateRequest,
        @AuthenticationPrincipal user: UserPrincipal
    ) =
        eventService.createEvent(request, user.id)

    /**
     * 이벤트 승인 (관리자)
     */
    @PatchMapping("/{eventId}/approval")
    @PreAuthorize("hasRole('ADMIN')")
    fun approveEvent(
        @PathVariable eventId: Long,
        @RequestBody request: EventApprovalRequest,
        @AuthenticationPrincipal user: UserPrincipal
    ) =
        eventService.approveEvent(eventId, request, user.id)

    /**
     * 이벤트 목록 조회 (공개)
     */
    @GetMapping
    fun getVisibleEvents() =
        eventService.getVisibleEvents()

    /**
     * 이벤트 상세 조회 (공개, 승인된 이벤트만)
     */
    @GetMapping("/{eventId}")
    fun getEventDetail(
        @PathVariable eventId: Long
    ) =
        eventService.getEventDetail(eventId)
}
