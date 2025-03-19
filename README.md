# 🚗 Car go(카고) - 1박 2일 드라이브 코스 추천 서비스

"Car go(카고)"는 국내 드라이브 코스를 추천해주는 웹 서비스입니다.  
지역과 테마를 선택하면, AI가 맞춤형 여행 경로를 제공하며, 최근 검색 기록을 저장하고 지도로 확인할 수 있습니다.

✅ **배포 URL:** [Car go 서비스 바로가기](https://cargo-a947a.web.app/)


## 🛠 기술 스택

### **Frontend**
- **Framework:** Next.js 15.1.3 (App Router, CSR)
- **State Management:** Zustand
- **UI Library:** MUI (Material-UI)
- **Styling:** Emotion, CSS Modules
- **Data Fetching:** Fetch API
- **Storage:** localStorage, sessionStorage
- **Deployment:** Firebase Hosting

### **Backend / API**
- **AI Recommendation:** Google Gemini API (Gemini 2.0 Flash)
- **Geolocation:** Naver Maps API (Geocoding & Maps SDK)
- **Serverless Functions:** Firebase Functions (API)

---

## 📌 주요 기능

### 1. 🚘 **드라이브 코스 추천**
- 지역(서울/강원/전라 등)과 테마(산/바다/도심 등)를 선택하면 AI가 추천
- Google Gemini API를 활용하여 맞춤형 여행지 추천
- 네이버 지도 API를 통해 추천 장소의 위도/경도 정보 정확하게 보정

### 2. 📍 **지도 기능**
- 추천된 장소를 네이버 지도에 마커로 표시
- 장소를 클릭하면 상세 정보 및 인포 윈도우 표시
- 교통 정보(Traffic Layer) ON/OFF 가능

### 3. 🔍 **최근 검색 기록 저장**
- Zustand + localStorage를 활용하여 최근 검색 내역 저장 (최대 5개)
- 최근 검색한 옵션과 장소를 `Home` 화면에서 바로 확인 가능

### 4. 🚀 **빠른 성능 최적화**
- `useMemo`, `useCallback`을 활용한 렌더링 최적화
- Zustand의 `persist` 미들웨어로 상태 유지
- API 호출 시 로딩 상태 관리 (`useState` 활용)

---

## 📂 프로젝트 구조

```bash
📦 car-go
├── 📂 public
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 api/recommend  # 추천 API (Git에서 제외)
│   │   ├── 📂 map            # 지도 페이지
│   │   ├── 📂 home           # 홈 화면
│   ├── 📂 components
│   │   ├── 📂 common        # 공통 UI 컴포넌트
│   │   ├── 📂 map           # 지도 관련 UI
│   ├── 📂 store             # Zustand 상태 관리
│   ├── 📂 lib               # API, 유틸 함수
│   ├── 📂 styles            # 스타일 파일
│   ├── 📜 firebase.json     # Firebase 설정 파일
│   ├── 📜 .env              # 환경 변수 파일 (Git에 제외)
│   ├── 📜 package.json
│   ├── 📜 README.md
