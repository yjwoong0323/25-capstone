package ac.kr.bu.theater.jwt  // ✅ 이 줄이 없어서 Unresolved reference가 난 거야

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.Date

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret}") private val secretKey: String,
    @Value("\${jwt.access_expiration}") private val accessExpiration: Long,
    @Value("\${jwt.refresh_expiration}") private val refreshExpiration: Long
) {
    private val key by lazy {
        Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey))
    }

    private fun createToken(userId: Long, expiration: Long): String {
        val now = Date()
        return Jwts.builder()
            .setSubject(userId.toString())
            .setIssuedAt(now)
            .setExpiration(Date(now.time + expiration))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun createAccessToken(userId: Long) = createToken(userId, accessExpiration)
    fun createRefreshToken(userId: Long) = createToken(userId, refreshExpiration)

    fun validateToken(token: String): Boolean =
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }

    fun getUserId(token: String): Long =
        Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token).body.subject.toLong()

    fun getAccessExpiration() = accessExpiration
    fun getRefreshExpiration() = refreshExpiration
}
