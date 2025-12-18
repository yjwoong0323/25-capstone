package ac.kr.bu.theater.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    /**
     * 잘못된 요청 (비즈니스 로직 오류)
     */
    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgumentException(e: IllegalArgumentException): ResponseEntity<Map<String, String>> {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(mapOf("error" to e.message.orEmpty()))
    }

    /**
     * 상태가 맞지 않는 요청 (승인 안 된 이벤트 접근 등)
     */
    @ExceptionHandler(IllegalStateException::class)
    fun handleIllegalStateException(e: IllegalStateException): ResponseEntity<Map<String, String>> {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST) // 또는 FORBIDDEN(403)도 가능
            .body(mapOf("error" to e.message.orEmpty()))
    }

    /**
     * 그 외 예외 (진짜 서버 에러)
     */
    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): ResponseEntity<Map<String, String>> {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(mapOf("error" to "서버 내부 오류가 발생했습니다."))
    }
}
