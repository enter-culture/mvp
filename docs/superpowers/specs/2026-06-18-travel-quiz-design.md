# AI 심리테스트형 여행 추천 서비스 — 설계 문서

## 개요

사용자의 감성 단어 선택을 기반으로 여행 페르소나를 분석하고 맞춤형 로컬 체험을 추천하는 심리테스트형 웹 서비스. 사주보이즈(sajuboyz.com) 스타일의 감성 UI.

## 기술 스택

- **프레임워크:** Next.js 14 (App Router)
- **언어:** TypeScript
- **스타일:** Tailwind CSS + CSS Modules (애니메이션)
- **배포:** Vercel
- **데이터:** 하드코딩 더미 데이터 (AI/TourAPI 연동 없음)

## 아키텍처 — Feature-Sliced Design (FSD)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── pages/
│   └── home/
│       └── ui/HomePage.tsx
├── widgets/
│   ├── intro-screen/
│   ├── quiz-screen/
│   ├── loading-screen/
│   └── result-screen/
├── features/
│   ├── quiz-flow/
│   └── result-share/
├── entities/
│   ├── question/
│   ├── persona/
│   └── recommendation/
└── shared/
    ├── ui/
    ├── lib/
    └── config/
```

## 화면 흐름

`intro` → `quiz` → `loading` → `result`

`HomePage.tsx`가 `screen` 상태를 관리하며 각 위젯에 props 전달.

## 엔티티 타입

### Question
```ts
type Question = {
  id: number
  text: string
  chips: string[]
  multiSelect: boolean
}
```

### Persona
```ts
type Persona = {
  id: string
  title: string
  subtitle: string
  description: string
  recommendations: Recommendation[]
}
```

### Recommendation
```ts
type Recommendation = {
  id: string
  region: string
  title: string
  category: '숙박' | '액티비티' | '체험'
  imageUrl: string
}
```

## 화면별 UI 상세

### 화면 1: IntroScreen (인트로)
- 배경: CSS 그라디언트 애니메이션 (영상 대체)
- 중앙 하단: 메인 카피 + CTA 버튼
- 카피: "이번 주말, 폰 끄고 합법적으로 잠수 타실 분?"
- Glassmorphism 블러 처리
- CTA 버튼 글로우 애니메이션

### 화면 2: QuizScreen (테스트)
- 상단: Progress Bar (1/3 → 2/3 → 3/3)
- 질문 텍스트 (세리프 폰트)
- 칩 UI: 핀터레스트 태그 스타일, 불규칙 배치
- 칩 선택 시 색상 반전 + 테두리 글로우 애니메이션
- 하단 플로팅 [다음으로] 버튼 (1개 이상 선택 시 활성화)
- 화면 전환: fade-in 효과

### 화면 3: LoadingScreen (로딩)
- 감성 로딩 애니메이션 (텍스트 타이핑 효과)
- 동적 텍스트 1~2초 간격 순환:
  1. "사용자님의 여행 DNA를 분석 중입니다..."
  2. "어울리는 숨은 명소를 찾고 있어요..."
  3. "당신만의 여행 페르소나를 완성하고 있어요..."
- 3초 후 자동으로 result 화면 전환

### 화면 4: ResultScreen (결과)
- 상단: 페르소나 타이틀 (크게), 서브 카피, 스토리텔링 텍스트
- 중간: 가로 스와이프 추천 카드 캐러셀 (이미지 70%, 텍스트 30%)
- 하단: [결과 공유하기] [다시 테스트하기] 버튼
- Flexbox 기반 유동 레이아웃 (텍스트 길이 대응)

## 공유 UI 컴포넌트 (shared/ui)

- `Button` — variant: primary | ghost | floating
- `Chip` — selected 상태, 글로우 애니메이션
- `Card` — 추천 카드, 이미지 + 텍스트 구성
- `ProgressBar` — step 기반
- `GlassBox` — glassmorphism 컨테이너

## 톤앤매너

- **배경:** 다크 그라디언트 (딥 네이비 → 퍼플 → 블랙)
- **폰트:** 제목 세리프(Playfair Display 또는 나눔명조), 본문 산세리프(Pretendard)
- **컬러 포인트:** 골드 또는 모브(mauve) 계열 강조색
- **무드:** 핀터레스트 감성, 미니멀, 고급스러움
