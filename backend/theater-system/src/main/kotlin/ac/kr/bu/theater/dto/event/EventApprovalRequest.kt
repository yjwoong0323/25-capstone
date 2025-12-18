package ac.kr.bu.theater.dto.event
import ac.kr.bu.theater.dto.event.EventApprovalRequest

data class EventApprovalRequest(
    val approve: Boolean // true = 승인, false = 반려
)
