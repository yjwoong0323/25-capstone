package ac.kr.bu.theater.service.event

import ac.kr.bu.theater.domain.event.Event
import ac.kr.bu.theater.dto.event.EventApprovalRequest
import ac.kr.bu.theater.dto.event.EventCreateRequest
import ac.kr.bu.theater.dto.event.EventListResponse

interface EventService {

    fun createEvent(
        request: EventCreateRequest,
        userId: Long
    ): Event

    fun approveEvent(
        eventId: Long,
        request: EventApprovalRequest,
        adminId: Long
    ): Event

    // ✅ 반드시 추가해야 하는 부분
    fun getVisibleEvents(): List<EventListResponse>
    // ✅ 이벤트 상세 조회 추가
    fun getEventDetail(eventId: Long): EventListResponse
}
