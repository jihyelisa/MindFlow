# MindFlow Backend

사주 운세 애플리케이션을 위한 Express + MongoDB 백엔드 서버

## 설정 방법

### 1. 환경 변수 설정

`server/.env` 파일을 생성하고 다음 내용을 추가하세요:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindflow
```

**MongoDB 연결 문자열:**
- 로컬 MongoDB: `mongodb://localhost:27017/mindflow`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/mindflow`

### 2. 의존성 설치

```bash
cd server
npm install
```

### 3. 서버 실행

```bash
# 개발 모드 (nodemon 사용)
npm run dev

# 프로덕션 모드
npm start
```

## API 엔드포인트

### 사용자 관리

- `POST /api/users` - 새 사용자 생성
- `GET /api/users/:id` - 사용자 정보 조회
- `PUT /api/users/:id` - 사용자 정보 수정

### 사주 운세

- `POST /api/saju/readings` - 새 운세 생성
- `GET /api/saju/readings/:userId/:type` - 특정 타입의 운세 조회 (today/month/life)
- `GET /api/saju/readings/:userId` - 사용자의 모든 운세 조회
- `DELETE /api/saju/readings/cleanup` - 만료된 운세 삭제

## 데이터 모델

### User
- name: 이름
- birthDate: 생년월일
- birthTime: 출생 시간 (선택)
- gender: 성별 (선택)

### SajuReading
- userId: 사용자 ID
- type: 운세 타입 (today/month/life)
- content: 운세 내용
  - fortuneLevel: 운세 수준
  - fortuneDescription: 운세 설명
  - advice: 조언
  - luckyColor: 행운의 색 (선택)
  - luckyNumber: 행운의 숫자 (선택)
  - warning: 주의사항 (선택)
- expiresAt: 만료 시간 (today는 당일, month는 월말, life는 만료 없음)

## 테스트

서버가 실행 중인지 확인:
```bash
curl http://localhost:5000
```

사용자 생성 테스트:
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "birthDate": "1990-01-01",
    "birthTime": "14:30",
    "gender": "male"
  }'
```
