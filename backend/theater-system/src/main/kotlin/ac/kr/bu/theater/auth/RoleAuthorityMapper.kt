package ac.kr.bu.theater.auth

object RoleAuthorityMapper {
    /**
     * DB roles.name (예: "관리자", "담당자", "유저") -> Spring 권한 문자열 (예: "ROLE_ADMIN")
     */
    fun toAuthority(roleName: String): String {
        return when (roleName.trim()) {
            "관리자" -> "ROLE_ADMIN"      // role(1)
            "담당자" -> "ROLE_MANAGER"    // role(2)
            "유저"   -> "ROLE_USER"       // role(3)
            else     -> "ROLE_UNKNOWN"
        }
    }
}
