# 🎭 Theater System 개발 가이드라인

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [개발 환경 설정](#개발-환경-설정)
3. [프로젝트 구조](#프로젝트-구조)
4. [권한 시스템](#권한-시스템)
5. [남은 기능 개발 가이드](#남은-기능-개발-가이드)
6. [백엔드 API 개발](#백엔드-api-개발)
7. [프론트엔드 개발](#프론트엔드-개발)
8. [데이터베이스 스키마](#데이터베이스-스키마)
9. [개발 팁 및 주의사항](#개발-팁-및-주의사항)

---

## 🎯 프로젝트 개요

백석대학교 캠퍼스 공연 및 전시회 예매 관리 시스템입니다.

### 현재 완료된 기능 ✅
- 회원가입 (`/api/user/signup`)
- 로그인 (`/api/auth/login`) - JWT 토큰 발급 (AccessToken, RefreshToken)
- 로그아웃 (`/api/auth/logout`)
- 내 정보 조회 (`/api/user/me`)
- 토큰 재발급 (`/api/auth/reissue`)
- 프론트엔드와 백엔드 연동 완료

### 개발해야 할 기능 🔨

#### 1. 이벤트(공연/전시) 관리
- **부서 담당자(role_id=2)**: 포스팅 신청 API
- **관리자(role_id=1)**: 포스팅 승인/거부 API
- **일반 유저(role_id=3)**: 공개된 이벤트 목록 조회 API
- **스케줄러**: `visible_to` 날짜가 지난 이벤트 자동 비공개 처리

#### 2. 예매 시스템
- **일반 유저**: 예매 API (좌석 선택 포함)
- **일반 유저**: 내 예매 내역 조회 API
- 예매 시 좌석 중복 체크, 티켓 타입별 할당량 관리

#### 3. 추가 기능 (선택사항)
- 팟 구하기 게시판
- 대관 신청 시스템

---

## 🛠 개발 환경 설정

### 필수 요구사항
- **Java**: 17 이상
- **Kotlin**: 1.9.25
- **MySQL**: 8.0 이상
- **Redis**: 최신 버전
- **Node.js**: 16 이상
- **npm/yarn**: 최신 버전

### 1. MySQL 데이터베이스 설정

#### 데이터베이스 생성
```sql
CREATE DATABASE bu CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

#### MySQL 포트 설정 확인
- 현재 설정: **포트 3310**
- `application.yaml`에서 포트 확인 및 변경 가능

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3310/bu?useSSL=false&serverTimezone=Asia/Seoul&characterEncoding=UTF-8&allowPublicKeyRetrieval=true
    username: root
    password: 9874  # 본인의 MySQL 비밀번호로 변경
```

#### 초기 데이터 설정
1. `backend/theater-system/src/main/resources/application.yaml` 파일에서:
   ```yaml
   spring:
     sql:
       init:
         mode: always  # never → always로 변경 (처음 한 번만)
   ```

2. 애플리케이션 실행 후 비밀번호 해시 생성
   - 콘솔에 출력되는 BCrypt 해시 복사
   - `backend/theater-system/src/main/resources/sql/data.sql` 파일에서:
     ```sql
     -- 예시: 비밀번호 '1234'의 해시를 콘솔에서 복사한 값으로 교체
     INSERT INTO users (name, password_hash, email, phone, student_no, enrolled_student, status)
     VALUES ('조민서', '$2a$10$복사한해시값', 'msms@gmail.com', '010-1111-3333', '20211111', 0, 1);
     ```

3. 초기 데이터 삽입 완료 후 다시 `mode: never`로 변경

### 2. Redis 설정

#### Redis 설치 및 실행 (Windows)
```bash
# Redis 다운로드 및 설치 후
redis-server
```

#### Redis 포트 확인
- 기본 포트: **6379**
- `application.yaml`에서 설정 확인:
  ```yaml
  spring:
    data:
      redis:
        host: localhost
        port: 6379
  ```

### 3. 백엔드 설정

#### IntelliJ IDEA에서 실행
1. 프로젝트 열기: `backend/theater-system` 폴더 열기
2. Gradle 설정: File → Settings → Build, Execution, Deployment → Build Tools → Gradle
3. 실행: `TheaterSystemApplication.kt` 파일 우클릭 → Run
4. 포트 확인: **8080** (context-path: `/api`)

#### Gradle로 실행 (터미널)
```bash
cd backend/theater-system
./gradlew bootRun  # Windows: gradlew.bat bootRun
```

### 4. 프론트엔드 설정

```bash
cd front
npm install  # 의존성 설치
npm start    # 개발 서버 실행 (포트 3000)
```

---

## 📁 프로젝트 구조

### 백엔드 구조 (Kotlin/Spring Boot)

```
backend/theater-system/src/main/kotlin/ac/kr/bu/theater/
├── auth/                    # 인증 관련
│   ├── controller/         # AuthController (로그인, 로그아웃)
│   ├── dto/               # 인증 DTO
│   └── service/           # Redis 토큰 서비스
├── config/                 # 설정
│   ├── SecurityConfig.kt  # Spring Security 설정
│   └── WebConfig.kt       # CORS 설정
├── controller/            # 컨트롤러
│   └── UserController.kt  # 사용자 관련 API
├── domain/                # 엔티티 (데이터베이스 모델)
│   ├── event/            # Event, EventSchedule, Ticket, TicketType
│   ├── user/             # User, Role, UserRole
│   ├── organization/     # Organization
│   ├── venue/            # Venue, Seat
│   └── board/            # FreeBoard, BoardComment, BoardLike
├── dto/                   # 요청/응답 DTO
├── jwt/                   # JWT 토큰 관리
├── repository/            # JPA Repository
├── service/               # 비즈니스 로직
└── exception/             # 예외 처리
```

### 프론트엔드 구조 (React/TypeScript)

```
front/src/
├── components/           # 재사용 컴포넌트
│   └── Header.tsx
├── pages/               # 페이지 컴포넌트
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Booking.jsx
│   ├── Ticket.jsx
│   ├── MyPage.jsx
│   └── ...
├── context/             # Context API
│   └── UserContext.tsx  # 사용자 상태 관리
├── utils/               # 유틸리티
│   └── api.ts          # Axios 인스턴스 및 인터셉터
└── assets/             # 스타일 및 이미지
```

---

## 🔐 권한 시스템

### Role (역할)
- **role_id = 1**: 관리자 (어플 관리자)
- **role_id = 2**: 담당자 (부서 담당자)
- **role_id = 3**: 유저 (일반 유저)

### 권한별 기능

| 기능 | 관리자 (1) | 담당자 (2) | 유저 (3) |
|------|----------|----------|---------|
| 회원가입/로그인 | ✅ | ✅ | ✅ |
| 이벤트 신청 | ❌ | ✅ | ❌ |
| 이벤트 승인/거부 | ✅ | ❌ | ❌ |
| 공개 이벤트 조회 | ✅ | ✅ | ✅ |
| 예매 | ✅ | ✅ | ✅ |
| 내 예매 내역 조회 | ✅ | ✅ | ✅ |

### 권한 체크 방법
```kotlin
// SecurityConfig.kt 또는 Controller에서
@AuthenticationPrincipal user: UserPrincipal
// user.id로 User 조회 → user.roles 확인

// 예시: 담당자만 접근 가능한 API
if (user.roles.none { it.name == "담당자" }) {
    throw ForbiddenException("담당자만 접근 가능합니다.")
}
```

---

## 🎯 남은 기능 개발 가이드

### 1. 이벤트 포스팅 신청 (담당자)

#### API 명세
- **엔드포인트**: `POST /api/events`
- **권한**: 담당자(role_id=2)만 접근
- **요청 DTO** 예시:
  ```kotlin
  data class EventCreateRequest(
      val orgId: Long,
      val type: String,  // "PERFORMANCE" or "EXHIBITION"
      val title: String,
      val description: String?,
      val venueId: Long?,
      val visibleFrom: LocalDateTime,
      val visibleTo: LocalDateTime,
      val schedules: List<EventScheduleRequest>,  // 회차 정보
      val ticketTypes: List<TicketTypeRequest>    // 티켓 타입 정보
  )
  ```

#### 개발 단계
1. `dto/EventCreateRequest.kt` 생성
2. `controller/EventController.kt` 생성
3. `service/EventService.kt` 생성 (비즈니스 로직)
4. `repository/EventRepository.kt` 활용 (이미 존재)
5. 권한 체크: 현재 사용자가 담당자인지 확인
6. `approval_status = SUBMITTED`로 저장

#### 참고 코드 위치
- 엔티티: `domain/event/Event.kt`
- Repository: `repository/event/EventRepository.kt`

---

### 2. 이벤트 승인/거부 (관리자)

#### API 명세
- **엔드포인트**: 
  - `PATCH /api/events/{eventId}/approve` (승인)
  - `PATCH /api/events/{eventId}/reject` (거부)
- **권한**: 관리자(role_id=1)만 접근

#### 개발 단계
1. DTO 생성: `EventApproveRequest.kt` (거부 사유 등)
2. `EventController.kt`에 엔드포인트 추가
3. `EventService.kt`에 승인/거부 로직 추가
4. 승인 시: `approval_status = APPROVED`, `approved_by`, `approved_at` 설정
5. 거부 시: `approval_status = REJECTED`, 거부 사유 저장 (필요 시)

---

### 3. 공개 이벤트 목록 조회 (모든 유저)

#### API 명세
- **엔드포인트**: `GET /api/events/public`
- **권한**: 인증 불필요 (또는 모든 인증 유저)
- **쿼리 파라미터**: 
  - `page`: 페이지 번호
  - `size`: 페이지 크기
  - `type`: "PERFORMANCE" or "EXHIBITION" (선택)
  - `dateFrom`: 조회 시작 날짜 (선택)

#### 개발 단계
1. `EventController.kt`에 엔드포인트 추가
2. 쿼리 조건:
   - `approval_status = APPROVED`
   - `visible_from <= 현재시간`
   - `visible_to >= 현재시간`
3. 페이징 처리 (Spring Data JPA Pageable 사용)
4. 응답 DTO 생성: `EventListResponse.kt`

---

### 4. 스케줄러: 자동 비공개 처리

#### 목적
`visible_to` 날짜가 지난 이벤트를 자동으로 비공개 처리

#### 개발 단계
1. `config/SchedulerConfig.kt` 생성:
   ```kotlin
   @Configuration
   @EnableScheduling
   class SchedulerConfig
   ```

2. `service/EventSchedulerService.kt` 생성:
   ```kotlin
   @Service
   class EventSchedulerService(
       private val eventRepository: EventRepository
   ) {
       @Scheduled(cron = "0 0 * * * ?")  // 매시간 실행
       fun hideExpiredEvents() {
           val now = LocalDateTime.now()
           val expiredEvents = eventRepository.findByVisibleToBefore(now)
           // 비공개 처리 로직 (필요 시 별도 필드 추가 또는 쿼리에서 제외)
       }
   }
   ```

3. `build.gradle.kts`에 의존성 추가 (필요 시):
   ```kotlin
   implementation("org.springframework.boot:spring-boot-starter-quartz")
   ```

---

### 5. 예매 API (일반 유저)

#### API 명세
- **엔드포인트**: `POST /api/bookings`
- **권한**: 인증된 유저 (모든 role)
- **요청 DTO**:
  ```kotlin
  data class BookingRequest(
      val scheduleId: Long,      // 예매할 회차
      val ticketTypeId: Long,    // 티켓 타입
      val seatIds: List<Long>?   // 좌석 선택 (선택사항, SEATED 모드일 때만)
  )
  ```

#### 개발 단계
1. `dto/BookingRequest.kt` 생성
2. `controller/BookingController.kt` 생성
3. `service/BookingService.kt` 생성
4. 비즈니스 로직:
   - 이벤트가 승인되고 공개 상태인지 확인
   - 스케줄 상태가 `ON_SALE`인지 확인
   - 티켓 타입 할당량 확인 (`total_quota`, `quota_per_user`)
   - 좌석 중복 체크 (SEATED 모드일 때)
   - 티켓 생성 (`status = VALID`)
   - `expired_at` 설정 (스케줄의 `ends_at` 사용)
5. 트랜잭션 처리 (`@Transactional`)

#### 참고
- 엔티티: `domain/event/Ticket.kt`
- Repository: `repository/event/TicketRepository.kt`

---

### 6. 내 예매 내역 조회

#### API 명세
- **엔드포인트**: `GET /api/bookings/my`
- **권한**: 인증된 유저
- **쿼리 파라미터**: 
  - `status`: "VALID", "CANCELLED", "EXPIRED" (선택)
  - `page`, `size`: 페이징

#### 개발 단계
1. `BookingController.kt`에 엔드포인트 추가
2. 현재 로그인한 유저의 티켓 목록 조회
3. 관련 정보 포함 (Event, Schedule, Venue 등)
4. 응답 DTO 생성: `BookingListResponse.kt`

---

## 🔧 백엔드 API 개발

### 컨트롤러 작성 예시

```kotlin
@RestController
@RequestMapping("/events")
class EventController(
    private val eventService: EventService
) {
    @PostMapping
    fun createEvent(
        @RequestBody request: EventCreateRequest,
        @AuthenticationPrincipal user: UserPrincipal
    ): ResponseEntity<EventResponse> {
        // 권한 체크
        val createdEvent = eventService.createEvent(request, user.id)
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent)
    }
}
```

### 서비스 작성 예시

```kotlin
@Service
@Transactional
class EventServiceImpl(
    private val eventRepository: EventRepository,
    private val userRepository: UserRepository,
    private val organizationRepository: OrganizationRepository
) : EventService {
    
    override fun createEvent(request: EventCreateRequest, userId: Long): EventResponse {
        // 1. 유저 조회 및 권한 체크
        val user = userRepository.findById(userId)
            .orElseThrow { NotFoundException("사용자를 찾을 수 없습니다.") }
        
        // 2. 권한 확인 (담당자만 가능)
        val hasRole = user.roles.any { it.name == "담당자" }
        if (!hasRole) {
            throw ForbiddenException("담당자만 이벤트를 생성할 수 있습니다.")
        }
        
        // 3. Organization 조회
        val organization = organizationRepository.findById(request.orgId)
            .orElseThrow { NotFoundException("조직을 찾을 수 없습니다.") }
        
        // 4. Event 엔티티 생성
        val event = Event(
            organization = organization,
            type = EventType.valueOf(request.type),
            title = request.title,
            description = request.description,
            visibleFrom = request.visibleFrom,
            visibleTo = request.visibleTo,
            createdBy = user,
            approvalStatus = ApprovalStatus.SUBMITTED
        )
        
        // 5. 저장
        val savedEvent = eventRepository.save(event)
        
        // 6. DTO 변환 및 반환
        return EventResponse.from(savedEvent)
    }
}
```

### DTO 작성 예시

```kotlin
data class EventCreateRequest(
    val orgId: Long,
    val type: String,
    val title: String,
    val description: String?,
    val venueId: Long?,
    val visibleFrom: LocalDateTime,
    val visibleTo: LocalDateTime,
    val schedules: List<EventScheduleRequest>,
    val ticketTypes: List<TicketTypeRequest>
)

data class EventResponse(
    val id: Long,
    val title: String,
    val type: String,
    val approvalStatus: String,
    val visibleFrom: LocalDateTime,
    val visibleTo: LocalDateTime,
    val createdAt: LocalDateTime
) {
    companion object {
        fun from(event: Event): EventResponse {
            return EventResponse(
                id = event.id!!,
                title = event.title,
                type = event.type.name,
                approvalStatus = event.approvalStatus.name,
                visibleFrom = event.visibleFrom,
                visibleTo = event.visibleTo,
                createdAt = event.createdAt
            )
        }
    }
}
```

### SecurityConfig 권한 설정 예시

```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val jwtAuthenticationFilter: JwtAuthenticationFilter
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .sessionManagement { session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authorizeHttpRequests { auth ->
                // 공개 엔드포인트
                auth.requestMatchers(
                    HttpMethod.POST, "/user/signup", "/auth/login", "/auth/reissue"
                ).permitAll()
                
                auth.requestMatchers(
                    HttpMethod.GET, "/events/public"
                ).permitAll()
                
                // 인증 필요
                auth.requestMatchers(
                    HttpMethod.POST, "/events"
                ).authenticated()  // 추가 권한 체크는 서비스 레이어에서
                
                auth.anyRequest().authenticated()
            }
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        
        return http.build()
    }
}
```

---

## 💻 프론트엔드 개발

### API 호출 방법

프론트엔드에서는 `utils/api.ts`의 axios 인스턴스를 사용합니다:

```javascript
import api from '../utils/api';

// GET 요청
const response = await api.get('/events/public');
const events = response.data;

// POST 요청
const response = await api.post('/events', {
  orgId: 1,
  type: 'PERFORMANCE',
  title: '공연 제목',
  // ...
});

// 헤더에 자동으로 accessToken이 포함됩니다
```

### 페이지 컴포넌트 작성 예시

```javascript
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await api.get('/events/public');
      setEvents(response.data);
    } catch (error) {
      console.error('이벤트 로드 실패:', error);
      alert('이벤트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          {/* ... */}
        </div>
      ))}
    </div>
  );
}
```

### 예매 내역 연동 (MyPage.jsx 수정)

```javascript
import { useEffect, useState } from 'react';
import api from '../utils/api';

// MyPage 컴포넌트 내부
const [bookings, setBookings] = useState([]);

useEffect(() => {
  loadMyBookings();
}, []);

const loadMyBookings = async () => {
  try {
    const response = await api.get('/bookings/my');
    setBookings(response.data);
  } catch (error) {
    console.error('예매 내역 로드 실패:', error);
  }
};
```

---

## 🗄 데이터베이스 스키마

### 주요 테이블 설명

#### events
- **목적**: 공연/전시 정보
- **주요 필드**:
  - `approval_status`: SUBMITTED(신청), APPROVED(승인), REJECTED(거부)
  - `visible_from`, `visible_to`: 공개 기간
  - `created_by`: 신청한 담당자
  - `approved_by`: 승인한 관리자

#### event_schedules
- **목적**: 이벤트 회차 정보
- **주요 필드**:
  - `starts_at`, `ends_at`: 회차 시작/종료 시간
  - `capacity`: 정원
  - `status`: ON_SALE(판매중), CLOSED(마감), CANCELLED(취소)

#### tickets
- **목적**: 예매 내역
- **주요 필드**:
  - `user_id`: 예매한 유저
  - `schedule_id`: 예매한 회차
  - `ticket_type_id`: 티켓 타입
  - `seat_id`: 선택한 좌석 (SEATED 모드일 때만)
  - `status`: VALID(유효), CANCELLED(취소), EXPIRED(만료)
  - **제약**: `(schedule_id, seat_id)` 유니크 제약 (같은 좌석 중복 예매 방지)

#### ticket_types
- **목적**: 티켓 타입 (일반, VIP 등)
- **주요 필드**:
  - `quota_per_user`: 유저당 최대 예매 수
  - `total_quota`: 전체 할당량

---

## ⚠ 개발 팁 및 주의사항

### 1. 트랜잭션 처리
- 예매 같은 중요한 로직은 `@Transactional` 사용
- 동시성 문제 방지를 위해 비관적 락 또는 낙관적 락 고려

### 2. 에러 처리
- `GlobalExceptionHandler.kt` 활용
- 적절한 HTTP 상태 코드 반환 (400, 401, 403, 404, 500)

### 3. 날짜/시간 처리
- 모든 날짜는 `LocalDateTime` 사용
- 타임존: `Asia/Seoul` 설정 확인

### 4. 권한 체크
- Controller 레이어와 Service 레이어 양쪽에서 체크 권장
- `@AuthenticationPrincipal UserPrincipal` 사용

### 5. 쿼리 최적화
- N+1 문제 방지: `@EntityGraph` 또는 `fetch join` 사용
- 페이징 필수: 대용량 데이터 조회 시

### 6. 테스트
- Postman으로 API 테스트
- 프론트엔드 개발 시 브라우저 개발자 도구 활용

### 7. CORS 설정
- 현재 `WebConfig.kt`에서 `localhost:3000`만 허용
- 프로덕션 배포 시 실제 도메인 추가 필요

### 8. JWT 토큰
- AccessToken: 5시간 유효
- RefreshToken: 7일 유효
- Redis에 저장되어 로그아웃 시 즉시 무효화

---

## 📚 참고 자료

### Spring Boot 공식 문서
- https://spring.io/projects/spring-boot

### Kotlin 공식 문서
- https://kotlinlang.org/docs/home.html

### React 공식 문서
- https://react.dev/

### JWT 토큰
- 현재 프로젝트: `jwt/JwtTokenProvider.kt` 참고

---

## 🐛 문제 해결

### MySQL 연결 오류
- 포트 확인 (3310)
- 사용자명/비밀번호 확인
- 데이터베이스 생성 확인

### Redis 연결 오류
- Redis 서버 실행 확인
- 포트 확인 (6379)

### CORS 오류
- `WebConfig.kt`의 `allowedOrigins` 확인
- 브라우저 캐시 클리어

### JWT 토큰 오류
- 토큰 만료 확인
- Redis 연결 확인
- `Authorization` 헤더 형식 확인: `Bearer {token}`

---

## 📝 체크리스트

### 이벤트 관리
- [ ] 이벤트 신청 API (담당자)
- [ ] 이벤트 승인 API (관리자)
- [ ] 이벤트 거부 API (관리자)
- [ ] 공개 이벤트 목록 조회 API
- [ ] 스케줄러: 자동 비공개 처리

### 예매 시스템
- [ ] 예매 API
- [ ] 내 예매 내역 조회 API
- [ ] 예매 취소 API (선택)

### 프론트엔드
- [ ] 이벤트 신청 페이지
- [ ] 이벤트 승인 페이지 (관리자)
- [ ] 이벤트 목록 페이지
- [ ] 예매 페이지 (좌석 선택)
- [ ] 예매 내역 페이지 (MyPage)

---

**마지막 업데이트**: 2025년 1월

**문의사항이 있으면 GPT나 팀원에게 물어보세요!** 🚀

