package ac.kr.bu.theater.dto.event

import ac.kr.bu.theater.domain.event.Event
import java.time.LocalDateTime

data class EventListResponse(
    val id: Long,
    val title: String,
    val description: String?,
    val type: String,
    val venueName: String?,
    val visibleFrom: LocalDateTime,
    val showUntil: LocalDateTime
) {
    companion object {
        fun from(event: Event): EventListResponse =
            EventListResponse(
                id = event.id!!,
                title = event.title,
                description = event.description,
                type = event.type.name,
                venueName = event.venue?.name,
                visibleFrom = event.visibleFrom,
                showUntil = event.visibleTo
            )
    }
}
