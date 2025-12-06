# MindFlow Client

사주 운세 애플리케이션 프론트엔드 (Next.js + Chakra UI)

## 설정 방법

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**참고:** 프로덕션 환경에서는 실제 API URL로 변경하세요.

### 2. 의존성 설치

```bash
cd client
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속하세요.

## 주요 기능

### 온보딩
- 사용자 이름, 생년월일, 출생 시간, 성별 입력
- 백엔드 API를 통해 사용자 정보 저장
- localStorage에 사용자 ID 저장

### 사주 운세
- **오늘의 운세**: 당일 운세 조회
- **이번 달 운세**: 월간 운세 조회
- **인생 흐름**: 전체 인생 운세 조회

### 데이터 흐름
1. 온보딩 페이지에서 사용자 정보 입력
2. API를 통해 백엔드에 저장
3. 사주 메뉴에서 원하는 운세 선택
4. 백엔드에서 해당 운세 데이터 조회
5. 로딩 상태 표시 후 결과 렌더링

## API 통합

모든 API 호출은 `src/lib/api.ts`를 통해 이루어집니다:

```typescript
import { userApi, sajuApi } from '@/lib/api';

// 사용자 생성
const user = await userApi.create({ name, birthDate, birthTime, gender });

// 운세 조회
const reading = await sajuApi.getReading(userId, 'today');
```

## 타입 정의

TypeScript 타입은 `src/types/index.ts`에 정의되어 있습니다:
- `User`: 사용자 정보
- `SajuReading`: 사주 운세 정보
- `ApiResponse`: API 응답 형식
