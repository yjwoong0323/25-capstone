package ac.kr.bu.theater.service.event

import ac.kr.bu.theater.domain.event.ApprovalStatus
import ac.kr.bu.theater.domain.event.Event
import ac.kr.bu.theater.domain.event.EventType
import ac.kr.bu.theater.dto.event.EventApprovalRequest
import ac.kr.bu.theater.dto.event.EventCreateRequest
import ac.kr.bu.theater.dto.event.EventListResponse
import ac.kr.bu.theater.repository.event.EventRepository
import ac.kr.bu.theater.repository.organization.OrganizationRepository
import ac.kr.bu.theater.repository.user.UserRepository
import ac.kr.bu.theater.repository.venue.VenueRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class EventServiceImpl(
    private val eventRepository: EventRepository,
    private val organizationRepository: OrganizationRepository,
    private val venueRepository: VenueRepository,
    private val userRepository: UserRepository
) : EventService {

    /**
     * 이벤트 생성
     */
    override fun createEvent(request: EventCreateRequest, userId: Long): Event {

        val organization = organizationRepository.findById(request.organizationId)
            .orElseThrow { IllegalArgumentException("존재하지 않는 단체입니다.") }

        val venue = request.venueId?.let {
            venueRepository.findById(it)
                .orElseThrow { IllegalArgumentException("존재하지 않는 공연장입니다.") }
        }

        val creator = userRepository.findById(userId)
            .orElseThrow { IllegalArgumentException("유저를 찾을 수 없습니다.") }

        val event = Event(
            organization = organization,
            type = EventType.valueOf(request.type),
            title = request.title,
            description = request.description,
            venue = venue,
            approvalStatus = ApprovalStatus.SUBMITTED,
            createdBy = creator,
            visibleFrom = request.visibleFrom,
            visibleTo = request.visibleTo
        )

        return eventRepository.save(event)
    }

    /**
     * 이벤트 승인 / 반려
     */
    override fun approveEvent(
        eventId: Long,
        request: EventApprovalRequest,
        adminId: Long
    ): Event {

        val event = eventRepository.findById(eventId)
            .orElseThrow { IllegalArgumentException("이벤트를 찾을 수 없습니다.") }

        val admin = userRepository.findById(adminId)
            .orElseThrow { IllegalArgumentException("관리자 정보를 찾을 수 없습니다.") }

        event.approvalStatus =
            if (request.approve) ApprovalStatus.APPROVED
            else ApprovalStatus.REJECTED

        event.approvedBy = admin
        event.approvedAt = LocalDateTime.now()

        return event
    }

    /**
     * 승인 + 노출 기간 이벤트 목록
     */
    override fun getVisibleEvents(): List<EventListResponse> {
        val now = LocalDateTime.now()

        return eventRepository.findVisibleApprovedEvents(
            status = ApprovalStatus.APPROVED,
            now = now
        ).map { EventListResponse.from(it) }
    }

    /**
     * 이벤트 상세 조회
     * - 승인된 이벤트만 노출
     */
    override fun getEventDetail(eventId: Long): EventListResponse {

        val event = eventRepository.findById(eventId)
            .orElseThrow { IllegalArgumentException("이벤트를 찾을 수 없습니다.") }

        if (event.approvalStatus != ApprovalStatus.APPROVED) {
            throw IllegalStateException("아직 승인되지 않은 이벤트입니다.")
        }

        return EventListResponse.from(event)
    }
}
