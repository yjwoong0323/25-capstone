package ac.kr.bu.theater.repository.event

import ac.kr.bu.theater.domain.event.ApprovalStatus
import ac.kr.bu.theater.domain.event.Event
import ac.kr.bu.theater.domain.event.EventType
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface EventRepository : JpaRepository<Event, Long> {

    /* ===============================
     * 기존 페이징 기반 조회 (유지)
     * =============================== */

    fun findByOrganization_Id(
        orgId: Long,
        pageable: Pageable
    ): Page<Event>

    fun findByType(
        type: EventType,
        pageable: Pageable
    ): Page<Event>

    fun findByApprovalStatus(
        status: ApprovalStatus,
        pageable: Pageable
    ): Page<Event>

    fun findByCreatedBy_Id(
        createdById: Long,
        pageable: Pageable
    ): Page<Event>

    fun findByVisibleFromLessThanEqualAndVisibleToGreaterThanEqual(
        now1: LocalDateTime,
        now2: LocalDateTime,
        pageable: Pageable
    ): Page<Event>

    fun findByApprovalStatusAndVisibleFromLessThanEqualAndVisibleToGreaterThanEqual(
        status: ApprovalStatus,
        now1: LocalDateTime,
        now2: LocalDateTime,
        pageable: Pageable
    ): Page<Event>

    /* ===============================
     * ✅ 추가: 공개 이벤트 조회 (List)
     * =============================== */

    @Query("""
        SELECT e FROM Event e
        WHERE e.approvalStatus = :status
          AND e.visibleFrom <= :now
          AND e.visibleTo >= :now
        ORDER BY e.visibleFrom ASC
    """)
    fun findVisibleApprovedEvents(
        status: ApprovalStatus,
        now: LocalDateTime
    ): List<Event>
}
