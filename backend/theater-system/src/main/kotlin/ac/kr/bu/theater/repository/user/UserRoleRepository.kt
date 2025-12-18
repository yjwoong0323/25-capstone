package ac.kr.bu.theater.repository.user

import ac.kr.bu.theater.domain.user.UserRole
import ac.kr.bu.theater.domain.user.UserRoleId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface UserRoleRepository : JpaRepository<UserRole, UserRoleId> {

    fun findByUser_Id(userId: Long): List<UserRole>

    fun deleteByUser_Id(userId: Long)

    fun existsByUser_IdAndRole_Id(userId: Long, roleId: Long): Boolean

    /**
     * ✅ Security Filter 전용
     * role 엔티티 접근 없이 문자열로 권한 조회
     */
    @Query(
        """
        SELECT r.name
        FROM UserRole ur
        JOIN ur.role r
        WHERE ur.user.id = :userId
        """
    )
    fun findRoleNamesByUserId(@Param("userId") userId: Long): List<String>
}
