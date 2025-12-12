package ac.kr.bu.theater.controller

import ac.kr.bu.theater.auth.dto.UserPrincipal
import ac.kr.bu.theater.dto.UserMeResponse
import ac.kr.bu.theater.dto.UserSignupRequest
import ac.kr.bu.theater.dto.UserSignupResponse
import ac.kr.bu.theater.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController (
    private val userService: UserService
) {
    @PostMapping("/signup")
    fun signup(@RequestBody request: UserSignupRequest): ResponseEntity<UserSignupResponse> {
        val response = userService.createUser(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }

    @GetMapping("/me")
    fun getMyInfo(
        @AuthenticationPrincipal user: UserPrincipal
    ): ResponseEntity<UserMeResponse> {
        val userInfo = userService.getMyInfo(user.id)
        return ResponseEntity.ok(userInfo)
    }
}