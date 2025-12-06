package ac.kr.bu.theater.domain.venue

import jakarta.persistence.*

@Entity
@Table(name = "seats")
class Seat(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id", nullable = false)
    var venue: Venue,
    
    @Column(name = "seat_label", length = 20)
    var seatLabel: String = "none"
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null
}

