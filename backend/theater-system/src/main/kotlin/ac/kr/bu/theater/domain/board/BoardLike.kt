package ac.kr.bu.theater.domain.board

import ac.kr.bu.theater.domain.user.User
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "board_likes")
@IdClass(BoardLikeId::class)
class BoardLike(
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,
    
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    var board: FreeBoard,
    
    @Column(name = "created_at", nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now()
)

/**
 * BoardLike의 복합 키 클래스
 */
data class BoardLikeId(
    var user: Long = 0,
    var board: Long = 0
) : java.io.Serializable

