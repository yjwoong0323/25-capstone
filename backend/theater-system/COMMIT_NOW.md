# 지금 바로 커밋하기

## 🚀 빠른 커밋 명령어

현재 위치에서 다음 명령어를 순서대로 실행하세요:

```bash
# 1. 프로젝트 디렉토리로 이동
cd backend/theater-system

# 2. 변경사항 확인
git status

# 3. 모든 변경사항 추가 (프로젝트 구조 + SQL 파일 + 설정 파일)
git add build.gradle.kts
git add src/main/resources/application.yaml
git add src/main/kotlin/ac/kr/bu/theater/
git add src/main/resources/sql/

# 4. 커밋
git commit -m "chore: 백엔드 프로젝트 구조 설정 및 데이터베이스 초기화

- 프로젝트 폴더 구조 생성 (config, controller, domain, dto, exception, repository, service, util)
- Redis 의존성 추가
- MySQL 및 Redis 연결 설정
- SQL 초기화 설정 (schema.sql, data.sql)
- CORS 설정 추가
- 전역 예외 처리 및 공통 DTO 추가"

# 5. (선택) 원격 저장소에 푸시
git push origin back
```

## 📝 간단한 버전 (한 줄로)

```bash
cd backend/theater-system
git add .
git commit -m "chore: 백엔드 프로젝트 구조 및 DB 설정 초기화"
git push origin back
```

## ⚠️ 주의사항

- `.idea/` 폴더는 자동으로 제외됩니다 (`.gitignore`에 포함됨)
- `git add .`를 사용하면 현재 디렉토리의 모든 변경사항이 추가됩니다
- 커밋 전에 `git status`로 확인하는 것을 권장합니다

