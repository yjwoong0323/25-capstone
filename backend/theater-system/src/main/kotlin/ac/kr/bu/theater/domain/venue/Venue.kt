package ac.kr.bu.theater.domain.venue

import jakarta.persistence.*

enum class SeatMode {
    SEATED,  // 지정석
    FREE     // 자유석
}

@Entity
@Table(name = "venues")
class Venue(
    @Column(nullable = false, length = 200)
    var name: String,
    
    @Column(nullable = false, length = 200)
    var building: String,
    
    @Column(nullable = false, length = 200)
    var address: String,
    
    @Enumerated(EnumType.STRING)
    @Column(name = "seat_mode", nullable = false)
    var seatMode: SeatMode = SeatMode.SEATED,
    
    @Column(nullable = false)
    var capacity: Int = 10
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

