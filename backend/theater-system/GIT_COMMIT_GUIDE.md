# 초보자를 위한 Git 커밋 가이드

## 📋 현재 상태

### 변경된 파일 (Modified)
- `build.gradle.kts` - Redis 의존성 추가
- `application.yaml` - DB 설정 및 SQL 초기화 설정

### 새로 추가된 파일 (Untracked)
- `config/` - 설정 클래스들 (Security, Redis, Web)
- `controller/`, `domain/`, `dto/`, `exception/`, `repository/`, `service/`, `util/` - 프로젝트 구조
- `sql/` - SQL 파일들 (schema.sql, data.sql)

## ✅ 커밋 전 체크리스트

### 1. 불필요한 파일 제외 확인
- ✅ `.idea/` 폴더는 `.gitignore`에 포함되어 있음 (자동 제외됨)
- ✅ 빌드 파일들도 자동 제외됨

### 2. 커밋할 파일 확인
다음 파일들을 커밋하면 됩니다:
- ✅ 프로젝트 구조 파일들 (config, controller, domain 등)
- ✅ SQL 파일들
- ✅ 설정 파일들 (build.gradle.kts, application.yaml)

## 🚀 Git 커밋 단계별 가이드

### Step 1: 변경사항 확인
```bash
git status
```
→ 현재 변경된 파일 목록 확인

### Step 2: 커밋할 파일 추가 (Staging)
```bash
# 방법 1: 특정 파일만 추가 (권장)
git add build.gradle.kts
git add src/main/resources/application.yaml
git add src/main/kotlin/ac/kr/bu/theater/
git add src/main/resources/sql/

# 방법 2: 모든 변경사항 추가 (간단하지만 주의 필요)
git add .
```

### Step 3: 커밋 메시지 작성 및 커밋
```bash
git commit -m "커밋 메시지"
```

### Step 4: (선택) 원격 저장소에 푸시
```bash
git push origin back
```

## 📝 좋은 커밋 메시지 작성법

### 기본 형식
```
[타입] 간단한 제목 (50자 이내)

상세 설명 (선택사항)
- 변경 사항 1
- 변경 사항 2
```

### 타입 종류
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `chore`: 빌드 설정, 의존성 추가 등
- `config`: 설정 파일 변경

### 예시

#### 예시 1: 간단한 커밋
```bash
git commit -m "chore: 백엔드 프로젝트 구조 설정 및 SQL 파일 추가"
```

#### 예시 2: 상세한 커밋
```bash
git commit -m "chore: 백엔드 프로젝트 구조 설정 및 SQL 파일 추가

- 프로젝트 폴더 구조 생성 (config, controller, domain, dto, exception, repository, service, util)
- Redis 의존성 추가
- MySQL 및 Redis 연결 설정
- SQL 초기화 설정 (schema.sql, data.sql)
- CORS 설정 추가
- 전역 예외 처리 핸들러 추가
- 공통 API 응답 DTO 추가"
```

## 💡 초보자를 위한 팁

### 1. 작은 단위로 커밋하기
- 한 번에 너무 많은 변경사항을 커밋하지 말기
- 논리적으로 관련된 변경사항끼리 묶어서 커밋

### 2. 커밋 전에 확인하기
```bash
# 추가할 파일 확인
git status

# 변경 내용 확인
git diff
```

### 3. 실수했을 때
```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "새로운 메시지"

# Staging 취소 (파일은 그대로)
git reset HEAD <파일명>

# 변경사항 완전히 취소 (주의!)
git restore <파일명>
```

## 🎯 현재 상황에 맞는 커밋 메시지 추천

### 옵션 1: 간단한 버전
```
chore: 백엔드 프로젝트 구조 및 DB 설정 초기화
```

### 옵션 2: 상세한 버전
```
chore: 백엔드 프로젝트 구조 설정 및 데이터베이스 초기화

- 프로젝트 폴더 구조 생성
  * config: Security, Redis, Web 설정
  * controller, domain, dto, exception, repository, service, util 패키지 생성
- Redis 의존성 추가 (build.gradle.kts)
- MySQL 및 Redis 연결 설정 (application.yaml)
- SQL 초기화 설정 (schema.sql, data.sql)
- CORS 설정 추가
- 전역 예외 처리 및 공통 DTO 추가
```

## ⚠️ 주의사항

1. **`.idea/` 폴더는 커밋하지 않기**
   - 이미 `.gitignore`에 포함되어 있어서 자동으로 제외됨
   - 만약 추가되려고 하면 `git rm -r --cached .idea/` 실행

2. **비밀번호나 민감한 정보 확인**
   - `application.yaml`에 비밀번호가 있지만, 이건 로컬 개발용이므로 괜찮음
   - 운영 환경에서는 환경 변수 사용 권장

3. **큰 파일 확인**
   - SQL 파일은 텍스트 파일이므로 문제없음

