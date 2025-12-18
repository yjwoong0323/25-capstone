package ac.kr.bu.theater.dto.event

import java.time.LocalDateTime

data class EventCreateRequest(
    val organizationId: Long,
    val venueId: Long?,
    val type: String,
    val title: String,
    val description: String?,
    val visibleFrom: LocalDateTime,
    val visibleTo: LocalDateTime
)
