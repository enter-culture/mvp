# Sajuboyz-Style Travel Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the travel quiz app with a sajuboyz.com-style cinematic landing page, Pexels video backgrounds, updated quiz (80 chips across 3 questions), and dedicated destination detail pages at `/destination/[id]`.

**Architecture:** Multi-page Next.js App Router. Landing at `/`, quiz at `/quiz`, results at `/result?persona=[id]`, destination details at `/destination/[id]`. Persona computed client-side via chip scoring; passed as URL query param. Pexels videos via `<video autoPlay muted loop playsInline>`. Unsplash images via CDN URL.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, FSD, `next/navigation` for routing.

---

## File Map

```
MODIFY:
  src/app/page.tsx                              → render LandingPage
  src/entities/question/data/questions.ts       → 80 new chips (3 questions)
  src/entities/persona/model/types.ts           → add destinationIds field
  src/entities/persona/data/personas.ts         → 5 personas (no embedded recommendations)
  src/features/quiz-flow/model/useQuizFlow.ts   → 3-5 chip selection + router navigation
  src/features/quiz-flow/lib/getPersona.ts      → scoring-based mapping (5 personas)

CREATE:
  src/app/quiz/page.tsx                         → /quiz route
  src/app/result/page.tsx                       → /result route
  src/app/destination/[id]/page.tsx             → /destination/[id] route
  src/entities/destination/model/types.ts       → Destination type
  src/entities/destination/data/destinations.ts → 10 destinations with video+images
  src/shared/ui/VideoBackground/VideoBackground.tsx
  src/shared/ui/VideoBackground/index.ts
  src/views/landing/ui/LandingPage.tsx          → sajuboyz.com layout
  src/views/landing/index.ts
  src/views/quiz/ui/QuizPage.tsx                → wraps quiz flow
  src/views/quiz/index.ts
  src/views/result/ui/ResultPage.tsx            → reads ?persona= param
  src/views/result/index.ts
  src/views/destination/ui/DestinationPage.tsx  → reads [id] param
  src/views/destination/index.ts
  src/widgets/destination-carousel/ui/DestinationCarousel.tsx
  src/widgets/destination-carousel/index.ts

DELETE (after new pages work):
  src/views/home/  (replaced by per-route views)
  src/widgets/intro-screen/
  src/widgets/quiz-screen/
  src/widgets/loading-screen/
  src/widgets/result-screen/
```

---

### Task 1: Create directories for new FSD slices

**Files:**
- Create: directory structure for new slices

- [ ] **Step 1: Create directories**

```bash
mkdir -p src/app/quiz
mkdir -p src/app/result
mkdir -p "src/app/destination/[id]"
mkdir -p src/entities/destination/model
mkdir -p src/entities/destination/data
mkdir -p src/shared/ui/VideoBackground
mkdir -p src/views/landing/ui
mkdir -p src/views/quiz/ui
mkdir -p src/views/result/ui
mkdir -p src/views/destination/ui
mkdir -p src/widgets/destination-carousel/ui
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "chore: add directories for redesign slices"
```

---

### Task 2: Update entity data — Questions (80 new chips)

**Files:**
- Modify: `src/entities/question/data/questions.ts`

- [ ] **Step 1: Replace questions.ts entirely**

```ts
import type { Question } from '../model/types'

export const questions: Question[] = [
  {
    id: 1,
    text: '잠시 눈을 감고 상상해 보세요👀\n주말 국내 여행을 생각했을 때,\n가장 마음이 끌리는 단어 3~5개를 골라주세요.',
    chips: [
      '설레는', '홀가분한', '짜릿한', '아련한', '편안한',
      '뿌듯한', '충만한', '차분한', '뭉클한', '자유로운',
      '위로가 되는', '도망치고 싶은', '낭만적인', '고즈넉한', '트렌디한',
      '활기찬', '평화로운', '이국적인', '아늑한', '그리운',
      '웅장한', '몽환적인', '정겨운',
    ],
    multiSelect: true,
  },
  {
    id: 2,
    text: '문을 열고 나가면 어떤 풍경이 펼쳐지나요?\n그곳에서 무엇을 하며 머물고 있을지\n생각하며 아래 단어 3~5개를 골라주세요.',
    chips: [
      '맛집탐방', '동네산책', '드라이브', '밤샘수다', '인생샷',
      '늦잠', '서핑', '전시관람', '불멍', '로컬 쇼핑',
      '알찬 일정', '발길 닿는대로', '계획여행', '휴식여행', '즉흥여행',
      '한옥마을', '오션뷰', '깊은산속', '시골오일장', '독채펜션',
      '게스트하우스', '루프탑', '푸른 수목원', '팝업스토어', '골목노포',
      '숨은명소', '야경',
    ],
    multiSelect: true,
  },
  {
    id: 3,
    text: "이번 여행을 함께하고 싶은 '대상'과\n채우고 싶은 '경험' 3~5개를 골라주세요.",
    chips: [
      '우리끼리', '새로운인연', '반려동물', '가족과함께', '혼자만의시간',
      '소소한교감', '현지인처럼', '인스타감성', '추억여행', '프라이빗',
      '패러글라이딩', '템플스테이', '호캉스', '차박', '트레킹',
      '미식클래스', '소품샵투어', '노을감상', '지역축제', '북스테이',
      '플렉스', '가성비', '기차여행', '마음비우기', '촌캉스',
      '로컬미식', '산림욕', '이색체험', '멍때리기', '걷기여행',
    ],
    multiSelect: true,
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/entities/question/data/questions.ts
git commit -m "feat: update quiz questions with 80 new chips (3-question set)"
```

---

### Task 3: Destination entity — types and 10 destinations

**Files:**
- Create: `src/entities/destination/model/types.ts`
- Create: `src/entities/destination/data/destinations.ts`

- [ ] **Step 1: Create Destination type**

Create `src/entities/destination/model/types.ts`:

```ts
export type Spot = {
  name: string
  description: string
}

export type Destination = {
  id: string
  personaId: string
  region: string
  title: string
  mood: string
  description: string
  videoUrl: string
  images: string[]
  spots: Spot[]
  tags: string[]
}
```

- [ ] **Step 2: Create 10 destinations**

Create `src/entities/destination/data/destinations.ts`:

```ts
import type { Destination } from '../model/types'

export const destinations: Destination[] = [
  {
    id: 'gurye',
    personaId: 'nopo',
    region: '전남 구례',
    title: '별 보며 잠드는 빈집 재생 로컬 스테이',
    mood: '고즈넉한 · 정겨운 · 아늑한',
    description:
      '지리산 자락 아래, 오래된 빈집을 정성껏 되살린 로컬 스테이. 밤이면 쏟아지는 별빛과 새벽 산안개가 지친 마음을 씻어줍니다. 마을 할머니가 만들어주시는 산채 한 상은 덤입니다.',
    videoUrl: 'https://videos.pexels.com/video-files/4113548/4113548-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    spots: [
      { name: '산동 산수유마을', description: '봄이면 노란 산수유꽃이 온 마을을 물들이는 곳' },
      { name: '연곡사', description: '지리산 깊은 곳에 자리한 천년 고찰, 단풍이 특히 아름다움' },
      { name: '섬진강 강변길', description: '자전거로 느리게 달리는 섬진강변 5km 코스' },
    ],
    tags: ['혼자만의시간', '자연 힐링', '불멍', '걷기여행', '고즈넉한'],
  },
  {
    id: 'andong',
    personaId: 'nopo',
    region: '경북 안동',
    title: '대를 이은 골목 노포와 하회마을 탐방',
    mood: '정겨운 · 그리운 · 편안한',
    description:
      '600년 전통의 하회마을 돌담길을 걷고, 골목마다 숨어있는 50년 된 찜닭집과 간고등어 노포를 찾아다니는 여행. 안동 특유의 느린 시간 속에서 진짜 한국의 정취를 느낍니다.',
    videoUrl: 'https://videos.pexels.com/video-files/8093283/8093283-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    ],
    spots: [
      { name: '하회마을', description: 'UNESCO 세계유산, 류씨 종가와 고택이 살아 숨 쉬는 곳' },
      { name: '안동찜닭 골목', description: '원조 안동찜닭 가게들이 모인 구시장 골목' },
      { name: '월영교', description: '낙동강 위 우리나라 최장 목책교, 야경이 특히 아름다움' },
    ],
    tags: ['골목노포', '역사탐방', '로컬미식', '한옥마을', '정겨운'],
  },
  {
    id: 'goseong',
    personaId: 'beach',
    region: '강원 고성',
    title: '새벽 일출을 혼자 맞이하는 비밀 해변',
    mood: '자유로운 · 웅장한 · 낭만적인',
    description:
      '설악산과 동해가 만나는 경계, 고성. 아직 알려지지 않은 작은 해변에서 새벽 4시 일출을 맞이하는 경험은 평생 잊히지 않습니다. 맑은 날이면 멀리 금강산 능선까지 보입니다.',
    videoUrl: 'https://videos.pexels.com/video-files/1943821/1943821-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    ],
    spots: [
      { name: '아야진 해변', description: '투명한 에메랄드 물빛, 아직 덜 알려진 한적한 해변' },
      { name: '건봉사', description: '신라 시대 창건된 고찰, 소나무 숲길이 일품' },
      { name: '화진포 해양박물관', description: '이승만·김일성 별장이 있던 호수와 바다가 만나는 곳' },
    ],
    tags: ['혼자만의시간', '일출감상', '드라이브', '노을감상', '자유로운'],
  },
  {
    id: 'jeju-aewol',
    personaId: 'beach',
    region: '제주 애월',
    title: '파도 소리 들으며 자는 바다뷰 독채',
    mood: '몽환적인 · 낭만적인 · 편안한',
    description:
      '애월 해안도로를 따라 숨어있는 독채 숙소. 창문을 열면 바다가 바로 코앞. 밤새 파도 소리를 들으며 아무것도 하지 않는 것이 목적인 여행입니다. 인근 카페들은 덤.',
    videoUrl: 'https://videos.pexels.com/video-files/3168516/3168516-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    spots: [
      { name: '애월 해안도로', description: '드라이브 성지, 일몰 시간대에 특히 황금빛으로 물듦' },
      { name: '한담 해변', description: '현무암 바위와 에메랄드 바다의 조화가 독특한 소규모 해변' },
      { name: '협재 해수욕장', description: '비양도를 배경으로 한 제주 최고 수평선 뷰' },
    ],
    tags: ['독채펜션', '오션뷰', '즉흥여행', '멍때리기', '낭만적인'],
  },
  {
    id: 'seoul-seongsu',
    personaId: 'urban',
    region: '서울 성수',
    title: '팝업스토어 & 루프탑 카페 감성 투어',
    mood: '트렌디한 · 활기찬 · 인스타감성',
    description:
      '매주 새로운 팝업이 열리는 성수동. 오래된 공장 건물이 힙한 공간으로 변신한 이곳은 서울에서 가장 빠르게 진화하는 동네. 루프탑에서 바라보는 한강뷰도 놓치지 마세요.',
    videoUrl: 'https://videos.pexels.com/video-files/3997277/3997277-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80',
    ],
    spots: [
      { name: '성수 팝업 거리', description: '주말마다 다른 브랜드 팝업이 열리는 핫플 밀집 지역' },
      { name: '어니언 성수', description: '오래된 정수장을 개조한 인더스트리얼 카페의 원조' },
      { name: '서울숲', description: '성수동과 붙어있는 도심 속 공원, 피크닉 명소' },
    ],
    tags: ['팝업스토어', '인스타감성', '루프탑', '트렌디한', '소품샵투어'],
  },
  {
    id: 'busan-yeongdo',
    personaId: 'urban',
    region: '부산 영도',
    title: '감성 골목 & 오션뷰 루프탑 카페 탐방',
    mood: '낭만적인 · 트렌디한 · 이국적인',
    description:
      '부산의 숨겨진 보석, 영도. 흰여울 문화마을의 좁은 골목을 걸으며 바다를 내려다보고, 예술가들이 모여드는 감성 카페와 로컬 브루어리를 발견하는 여행.',
    videoUrl: 'https://videos.pexels.com/video-files/2518241/2518241-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80',
    ],
    spots: [
      { name: '흰여울 문화마을', description: '절벽 위 골목에 형성된 감성 마을, 영화 촬영지' },
      { name: '태종대', description: '기암괴석과 푸른 바다가 어우러진 영도 끝 절경' },
      { name: '깡깡이 예술마을', description: '조선소 지역이 예술로 재탄생한 부산의 힙한 공간' },
    ],
    tags: ['야경', '오션뷰', '인생샷', '동네산책', '이국적인'],
  },
  {
    id: 'inje',
    personaId: 'mountain',
    region: '강원 인제',
    title: '하얀 자작나무 숲 트레킹과 고독한 새벽',
    mood: '웅장한 · 차분한 · 충만한',
    description:
      '강원도 인제 원대리 자작나무 숲. 하얀 나무 기둥들이 빽빽하게 들어선 숲속을 혼자 걸으며 자신과 대화하는 시간. 이른 새벽 안개 속 자작나무 숲은 또 다른 세계입니다.',
    videoUrl: 'https://videos.pexels.com/video-files/1448735/1448735-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    spots: [
      { name: '원대리 자작나무 숲', description: '138ha 규모, 왕복 3시간 트레킹, 새벽 입산 가능' },
      { name: '설악산 백담사', description: '만해 한용운이 머물렀던 천년 고찰과 계곡' },
      { name: '내린천', description: '래프팅의 성지, 투명한 계곡물이 흐르는 청정 지역' },
    ],
    tags: ['트레킹', '깊은산속', '혼자만의시간', '마음비우기', '산림욕'],
  },
  {
    id: 'muju',
    personaId: 'mountain',
    region: '전북 무주',
    title: '덕유산 설천봉 케이블카와 고원의 밤하늘',
    mood: '웅장한 · 뭉클한 · 평화로운',
    description:
      '곤돌라를 타고 1520m 설천봉에 오르면 구름 위의 세상이 펼쳐집니다. 겨울엔 설원, 여름엔 초록 융단. 무주 반딧불 축제 시즌엔 오염되지 않은 밤하늘에 반딧불이가 수를 놓습니다.',
    videoUrl: 'https://videos.pexels.com/video-files/4113548/4113548-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    ],
    spots: [
      { name: '덕유산 설천봉', description: '케이블카로 오를 수 있는 1520m 고원, 사계절 절경' },
      { name: '무주 반딧불 축제', description: '오염되지 않은 청정 지역에서 만나는 반딧불이' },
      { name: '구천동 계곡', description: '무주 구천동 33경, 33개의 절경이 이어지는 계곡 트레킹' },
    ],
    tags: ['패러글라이딩', '지역축제', '가족과함께', '웅장한', '북스테이'],
  },
  {
    id: 'suncheon',
    personaId: 'foodie',
    region: '전남 순천',
    title: '낙안읍성 향토 밥상과 시골 오일장 탐방',
    mood: '정겨운 · 뿌듯한 · 충만한',
    description:
      '살아있는 민속촌 낙안읍성에서 진짜 한옥 민박을 경험하고, 5일장이 서는 날 오일장에서 할머니 손맛 향토 음식을 맛보는 여행. 순천만 갈대밭의 노을은 말이 필요 없습니다.',
    videoUrl: 'https://videos.pexels.com/video-files/8093283/8093283-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80',
    ],
    spots: [
      { name: '낙안읍성', description: '600년 역사의 살아있는 읍성 민속촌, 민박 가능' },
      { name: '순천 오일장', description: '매달 2·7일 열리는 전통 오일장, 향토 음식 천국' },
      { name: '순천만 습지', description: 'UNESCO 람사르 습지, 갈대밭 노을이 장관' },
    ],
    tags: ['시골오일장', '로컬미식', '한옥마을', '현지인처럼', '정겨운'],
  },
  {
    id: 'yesan',
    personaId: 'foodie',
    region: '충남 예산',
    title: '예당호 황금 물빛과 로컬 양조장 막걸리 빚기',
    mood: '뿌듯한 · 아늑한 · 낭만적인',
    description:
      '충청도의 숨은 미식 성지, 예산. 예당호 출렁다리를 건너 석양을 감상하고, 대를 이어 막걸리를 빚는 양조장에서 직접 술을 담그는 미식 클래스를 경험합니다.',
    videoUrl: 'https://videos.pexels.com/video-files/1448735/1448735-hd_1280_720_25fps.mp4',
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    spots: [
      { name: '예당호 출렁다리', description: '국내 최장 402m 출렁다리, 호수 위를 걷는 특별한 경험' },
      { name: '예산 양조장', description: '3대째 이어온 전통 막걸리 양조장, 빚기 클래스 운영' },
      { name: '예산 시장 순대국밥', description: '60년 전통 시장 국밥, 새벽 4시부터 문을 여는 노포' },
    ],
    tags: ['미식클래스', '로컬미식', '이색체험', '가성비', '뿌듯한'],
  },
]

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(d => d.id === id)
}

export function getDestinationsByPersona(personaId: string): Destination[] {
  return destinations.filter(d => d.personaId === personaId)
}
```

- [ ] **Step 3: Commit**

```bash
git add src/entities/destination/
git commit -m "feat: destination entity — types and 10 destination data entries"
```

---

### Task 4: Update Persona entity (5 personas, no embedded recommendations)

**Files:**
- Modify: `src/entities/persona/model/types.ts`
- Modify: `src/entities/persona/data/personas.ts`

- [ ] **Step 1: Update Persona type**

Replace `src/entities/persona/model/types.ts` entirely:

```ts
export type Persona = {
  id: string
  title: string
  subtitle: string
  description: string
  destinationIds: string[]
}
```

- [ ] **Step 2: Replace personas.ts with 5 personas**

Replace `src/entities/persona/data/personas.ts` entirely:

```ts
import type { Persona } from '../model/types'

export const personas: Persona[] = [
  {
    id: 'nopo',
    title: '삼시세끼 노포 정착민',
    subtitle: '화려한 핫플은 사절. 따뜻한 온기가 있는 시골 마을에서 위로받고 싶은 당신.',
    description:
      '빠르게 스쳐 지나가는 여행보다, 한 곳에 오래 머물며 그 마을의 냄새와 소리에 스며드는 여행을 사랑합니다. 유명 관광지 대신 골목 끝 낡은 국밥집, 할머니가 담근 김치 한 종지에서 진짜 위로를 찾는 사람. 이번 여행은 아무도 모르는 그 동네 단골이 되어보세요.',
    destinationIds: ['gurye', 'andong'],
  },
  {
    id: 'beach',
    title: '파도 앞 멍때리기 선수',
    subtitle: '생각이 많아질수록 바다 소리가 그리워지는 당신.',
    description:
      '머릿속이 복잡해질 때, 본능적으로 물을 찾습니다. 파도 소리가 잡념을 지워주고, 수평선 너머를 바라보다 보면 어느새 마음이 가벼워지죠. 핫플 카페나 맛집 리스트 대신, 모래사장에 발을 묻고 아무것도 하지 않는 것이 목적입니다.',
    destinationIds: ['goseong', 'jeju-aewol'],
  },
  {
    id: 'urban',
    title: '도심 감성 콜렉터',
    subtitle: '새로운 공간, 새로운 경험. 트렌드의 최전선에서 에너지를 얻는 당신.',
    description:
      '골목 끝 숨은 카페, 이번 주 새로 오픈한 팝업스토어, 루프탑에서 마시는 칵테일. 당신의 여행은 감성을 수집하는 행위입니다. 인스타 감성이 아니라, 진짜 자신의 취향을 쌓아가는 과정. 도시도 충분히 여행이 됩니다.',
    destinationIds: ['seoul-seongsu', 'busan-yeongdo'],
  },
  {
    id: 'mountain',
    title: '산속 고독 탐험가',
    subtitle: '혼자 오르는 산이 제일 무섭고, 제일 좋은 당신.',
    description:
      '정상에서 느끼는 그 충만함을 아는 사람만 압니다. 묵묵히 걷고, 깊게 숨 쉬고, 아무 말 없이 앉아서 바람 소리를 듣는 것. 가이드북에 없는 루트를 혼자 찾아가는 것이 진짜 모험입니다. 이번엔 조금 더 높이, 조금 더 깊이 들어가 봅니다.',
    destinationIds: ['inje', 'muju'],
  },
  {
    id: 'foodie',
    title: '로컬 미식 기록자',
    subtitle: '맛있는 것 앞에서는 어디든 갈 수 있는 당신.',
    description:
      '여행의 목적이 음식인 사람. 현지 재래시장을 먼저 검색하고, 할머니 손맛 식당 앞에서는 줄 서는 것도 즐겁습니다. SNS 맛집이 아닌, 현지 주민이 30년째 다니는 그 식당을 찾아내는 것이 당신의 특기. 한 끼 한 끼가 이 지역의 이야기입니다.',
    destinationIds: ['suncheon', 'yesan'],
  },
]

export function getPersonaById(id: string): Persona | undefined {
  return personas.find(p => p.id === id)
}
```

- [ ] **Step 3: Commit**

```bash
git add src/entities/persona/
git commit -m "feat: expand to 5 personas with destinationIds (no embedded recommendations)"
```

---

### Task 5: Update quiz flow — 3-5 chip selection + routing

**Files:**
- Modify: `src/features/quiz-flow/model/useQuizFlow.ts`
- Modify: `src/features/quiz-flow/lib/getPersona.ts`

- [ ] **Step 1: Update getPersona with scoring system**

Replace `src/features/quiz-flow/lib/getPersona.ts` entirely:

```ts
import { personas, getPersonaById } from '@/entities/persona/data/personas'
import type { Persona } from '@/entities/persona/model/types'

const PERSONA_CHIPS: Record<string, string[]> = {
  nopo: ['고즈넉한', '정겨운', '편안한', '아늑한', '그리운', '위로가 되는', '불멍', '골목노포', '한옥마을', '시골오일장', '템플스테이', '촌캉스', '걷기여행', '휴식여행', '발길 닿는대로'],
  beach: ['자유로운', '이국적인', '낭만적인', '몽환적인', '짜릿한', '도망치고 싶은', '서핑', '오션뷰', '즉흥여행', '노을감상', '멍때리기', '독채펜션', '드라이브'],
  urban: ['트렌디한', '활기찬', '설레는', '인생샷', '팝업스토어', '루프탑', '인스타감성', '야경', '전시관람', '로컬 쇼핑', '소품샵투어', '플렉스', '알찬 일정'],
  mountain: ['차분한', '웅장한', '충만한', '뭉클한', '평화로운', '트레킹', '깊은산속', '산림욕', '마음비우기', '북스테이', '패러글라이딩', '발길 닿는대로', '기차여행'],
  foodie: ['뿌듯한', '맛집탐방', '로컬미식', '미식클래스', '시골오일장', '골목노포', '현지인처럼', '지역축제', '이색체험', '가성비', '로컬 쇼핑'],
}

export function getPersona(answers: string[][]): Persona {
  const flat = answers.flat()
  const scores: Record<string, number> = { nopo: 0, beach: 0, urban: 0, mountain: 0, foodie: 0 }

  for (const chip of flat) {
    for (const [personaId, chips] of Object.entries(PERSONA_CHIPS)) {
      if (chips.includes(chip)) scores[personaId]++
    }
  }

  const topId = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return getPersonaById(topId) ?? personas[0]
}
```

- [ ] **Step 2: Update useQuizFlow — 3 min, 5 max selection**

Replace `src/features/quiz-flow/model/useQuizFlow.ts` entirely:

```ts
'use client'
import { useState, useRef } from 'react'
import { questions } from '@/entities/question/data/questions'
import { getPersona } from '../lib/getPersona'
import type { Persona } from '@/entities/persona/model/types'

const MIN_SELECTION = 3
const MAX_SELECTION = 5

type NextResult = { done: false } | { done: true; persona: Persona }

export function useQuizFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[][]>(
    () => questions.map(() => [])
  )
  const answersRef = useRef(answers)
  answersRef.current = answers

  const currentQuestion = questions[step]
  const currentAnswers = answers[step]
  const selectionCount = currentAnswers.length
  const canProceed = selectionCount >= MIN_SELECTION
  const maxReached = selectionCount >= MAX_SELECTION
  const isLastStep = step === questions.length - 1

  function toggleChip(chip: string) {
    setAnswers(prev =>
      prev.map((a, i) => {
        if (i !== step) return a
        if (a.includes(chip)) return a.filter(c => c !== chip)
        if (a.length >= MAX_SELECTION) return a
        return [...a, chip]
      })
    )
  }

  function nextStep(): NextResult {
    if (isLastStep) {
      return { done: true, persona: getPersona(answersRef.current) }
    }
    setStep(s => s + 1)
    return { done: false }
  }

  return {
    step,
    totalSteps: questions.length,
    currentQuestion,
    currentAnswers,
    selectionCount,
    canProceed,
    maxReached,
    isLastStep,
    toggleChip,
    nextStep,
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/quiz-flow/
git commit -m "feat: update quiz flow — 3-5 chip selection, scoring-based persona mapping"
```

---

### Task 6: VideoBackground shared component

**Files:**
- Create: `src/shared/ui/VideoBackground/VideoBackground.tsx`
- Create: `src/shared/ui/VideoBackground/index.ts`

- [ ] **Step 1: Create VideoBackground**

Create `src/shared/ui/VideoBackground/VideoBackground.tsx`:

```tsx
import { cn } from '@/shared/lib/cn'

type VideoBackgroundProps = {
  src: string
  fallbackImageUrl?: string
  overlay?: boolean
  overlayOpacity?: number
  className?: string
}

export function VideoBackground({
  src,
  fallbackImageUrl,
  overlay = true,
  overlayOpacity = 0.55,
  className,
}: VideoBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={fallbackImageUrl}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
        />
      )}
    </div>
  )
}
```

Create `src/shared/ui/VideoBackground/index.ts`:

```ts
export { VideoBackground } from './VideoBackground'
```

- [ ] **Step 2: Commit**

```bash
git add src/shared/ui/VideoBackground/
git commit -m "feat: VideoBackground shared component"
```

---

### Task 7: Landing page — sajuboyz.com style

**Files:**
- Create: `src/views/landing/ui/LandingPage.tsx`
- Create: `src/views/landing/index.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create LandingPage**

Create `src/views/landing/ui/LandingPage.tsx`:

```tsx
'use client'
import { useRouter } from 'next/navigation'
import { VideoBackground } from '@/shared/ui/VideoBackground'

const LANDING_VIDEO = 'https://videos.pexels.com/video-files/1093662/1093662-hd_1280_720_25fps.mp4'
const LANDING_POSTER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'

export function LandingPage() {
  const router = useRouter()

  return (
    <div className="relative flex flex-col items-center justify-between min-h-dvh px-6 py-6 overflow-hidden">
      <VideoBackground src={LANDING_VIDEO} fallbackImageUrl={LANDING_POSTER} overlayOpacity={0.6} />

      {/* Top bar */}
      <div className="relative z-10 w-full flex justify-end">
        <button className="text-xs text-white/60 font-sans border border-white/20 rounded-full px-3 py-1.5 hover:border-white/50 transition-colors">
          KO/EN
        </button>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center gap-6 max-w-sm w-full">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-white/50 font-sans tracking-[0.3em] uppercase">Travel DNA</p>
          <h1
            className="font-serif text-5xl font-bold text-white leading-none tracking-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            CULTURE
          </h1>
          <p className="text-sm text-white/70 font-sans tracking-[0.15em]">
            당신의 여행 본능이 알고 싶다
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-white/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* Testimonial */}
        <div className="text-center">
          <p className="text-white/90 font-serif text-base italic leading-relaxed">
            "처음으로 여행이 진짜 설레기 시작했어요."
          </p>
          <p className="text-white/50 font-sans text-xs mt-2">— 27 · 직장인</p>
        </div>

        {/* Badge */}
        <p className="text-accent font-sans text-xs tracking-wider">
          ✦ 무료 여행 성향 분석 — 지금 한정 ✦
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-4">
        <button
          onClick={() => router.push('/quiz')}
          className="w-full bg-accent text-black font-sans font-semibold text-base rounded-full py-4 px-6 hover:brightness-110 active:scale-95 transition-all duration-200"
        >
          나의 여행 성향 알아보기 →
        </button>

        <div className="flex gap-4 text-white/30 text-xs font-sans">
          <a href="#" className="hover:text-white/60 transition-colors">이용약관</a>
          <span>·</span>
          <a href="#" className="hover:text-white/60 transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </div>
  )
}
```

Create `src/views/landing/index.ts`:

```ts
export { LandingPage } from './ui/LandingPage'
```

- [ ] **Step 2: Update app/page.tsx**

Replace `src/app/page.tsx` entirely:

```tsx
import { LandingPage } from '@/views/landing'

export default function Page() {
  return <LandingPage />
}
```

- [ ] **Step 3: Commit**

```bash
git add src/views/landing/ src/app/page.tsx
git commit -m "feat: sajuboyz-style landing page with Pexels video background"
```

---

### Task 8: Quiz page at /quiz

**Files:**
- Create: `src/app/quiz/page.tsx`
- Create: `src/views/quiz/ui/QuizPage.tsx`
- Create: `src/views/quiz/index.ts`

- [ ] **Step 1: Create QuizPage view**

Create `src/views/quiz/ui/QuizPage.tsx`:

```tsx
'use client'
import { useRouter } from 'next/navigation'
import { useQuizFlow } from '@/features/quiz-flow/model/useQuizFlow'
import { ProgressBar } from '@/shared/ui/ProgressBar'
import { Chip } from '@/shared/ui/Chip'
import { Button } from '@/shared/ui/Button'

export function QuizPage() {
  const router = useRouter()
  const {
    step,
    totalSteps,
    currentQuestion,
    currentAnswers,
    selectionCount,
    canProceed,
    maxReached,
    toggleChip,
    nextStep,
  } = useQuizFlow()

  function handleNext() {
    const result = nextStep()
    if (result.done) {
      router.push(`/result?persona=${result.persona.id}`)
    }
  }

  return (
    <div className="animated-bg relative flex flex-col min-h-dvh px-6 pt-12 pb-36">
      <div className="relative z-10 w-full max-w-sm mx-auto">
        {/* Back button */}
        <button
          onClick={() => step === 0 ? router.push('/') : null}
          className="text-white/40 font-sans text-sm mb-6 hover:text-white/70 transition-colors"
        >
          ← 뒤로
        </button>

        <ProgressBar current={step + 1} total={totalSteps} className="mb-8" />

        {/* Selection counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-serif text-xl text-white leading-relaxed whitespace-pre-line">
            {currentQuestion.text}
          </p>
        </div>

        {/* Selection count badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className={`text-xs font-sans px-3 py-1 rounded-full border transition-colors ${
            canProceed ? 'text-accent border-accent/50 bg-accent/10' : 'text-white/40 border-white/20'
          }`}>
            {selectionCount} / 최대 5개 선택
          </span>
          {maxReached && (
            <span className="text-xs text-white/40 font-sans">최대 선택 완료</span>
          )}
        </div>

        {/* Chips — Pinterest scattered layout */}
        <div className="flex flex-wrap gap-2">
          {currentQuestion.chips.map((chip, i) => (
            <div
              key={chip}
              className="fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <Chip
                label={chip}
                selected={currentAnswers.includes(chip)}
                onClick={() => toggleChip(chip)}
                disabled={maxReached && !currentAnswers.includes(chip)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating bottom button */}
      <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center px-6 z-20 gap-2">
        <p className="text-white/30 text-xs font-sans">
          {canProceed ? '' : `${3 - selectionCount}개 더 선택해주세요`}
        </p>
        <Button
          variant="floating"
          disabled={!canProceed}
          onClick={handleNext}
          className="max-w-sm"
        >
          {step < totalSteps - 1 ? '다음으로' : '결과 보기'}
        </Button>
      </div>
    </div>
  )
}
```

Create `src/views/quiz/index.ts`:

```ts
export { QuizPage } from './ui/QuizPage'
```

- [ ] **Step 2: Update Chip component to support disabled prop**

Read `src/shared/ui/Chip/Chip.tsx`. Add `disabled` prop:

Replace `src/shared/ui/Chip/Chip.tsx` entirely:

```tsx
'use client'
import { cn } from '@/shared/lib/cn'

type ChipProps = {
  label: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
}

export function Chip({ label, selected, onClick, disabled = false }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled && !selected}
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1.5 text-sm font-sans border transition-all duration-200 cursor-pointer',
        selected
          ? 'bg-accent text-black border-accent chip-selected-glow'
          : 'bg-transparent text-white/80 border-white/30 hover:border-accent/60',
        disabled && !selected && 'opacity-30 cursor-not-allowed',
      )}
    >
      {label}
    </button>
  )
}
```

- [ ] **Step 3: Create /quiz route**

Create `src/app/quiz/page.tsx`:

```tsx
import { QuizPage } from '@/views/quiz'

export default function Page() {
  return <QuizPage />
}
```

- [ ] **Step 4: Commit**

```bash
git add src/views/quiz/ src/app/quiz/ src/shared/ui/Chip/Chip.tsx
git commit -m "feat: /quiz page with 3-5 chip selection, disabled state, result navigation"
```

---

### Task 9: Result page at /result

**Files:**
- Create: `src/views/result/ui/ResultPage.tsx`
- Create: `src/views/result/index.ts`
- Create: `src/app/result/page.tsx`
- Create: `src/widgets/destination-carousel/ui/DestinationCarousel.tsx`
- Create: `src/widgets/destination-carousel/index.ts`

- [ ] **Step 1: Create DestinationCarousel widget**

Create `src/widgets/destination-carousel/ui/DestinationCarousel.tsx`:

```tsx
'use client'
import { useRouter } from 'next/navigation'
import { Card } from '@/shared/ui/Card'
import type { Destination } from '@/entities/destination/model/types'

type DestinationCarouselProps = {
  destinations: Destination[]
}

export function DestinationCarousel({ destinations }: DestinationCarouselProps) {
  const router = useRouter()
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2">
      {destinations.map(dest => (
        <button
          key={dest.id}
          type="button"
          onClick={() => router.push(`/destination/${dest.id}`)}
          className="flex-shrink-0 text-left focus:outline-none"
        >
          <Card
            imageUrl={dest.images[0]}
            imageAlt={dest.title}
            badge={`${dest.region}`}
            title={dest.title}
          />
        </button>
      ))}
    </div>
  )
}
```

Create `src/widgets/destination-carousel/index.ts`:

```ts
export { DestinationCarousel } from './ui/DestinationCarousel'
```

- [ ] **Step 2: Create ResultPage**

Create `src/views/result/ui/ResultPage.tsx`:

```tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getPersonaById } from '@/entities/persona/data/personas'
import { getDestinationsByPersona } from '@/entities/destination/data/destinations'
import { DestinationCarousel } from '@/widgets/destination-carousel'
import { Button } from '@/shared/ui/Button'

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const personaId = searchParams.get('persona') ?? 'nopo'
  const persona = getPersonaById(personaId) ?? getPersonaById('nopo')!
  const destList = getDestinationsByPersona(persona.id)

  return (
    <div className="animated-bg relative flex flex-col min-h-dvh">
      <div className="relative z-10 flex flex-col min-h-dvh">
        {/* Persona header */}
        <div className="px-6 pt-16 pb-6 fade-in">
          <p className="text-xs text-accent font-sans tracking-[0.2em] uppercase mb-3">
            당신의 여행 페르소나
          </p>
          <h1 className="font-serif text-3xl text-white leading-tight mb-4">
            [{persona.title}]
          </h1>
          <p className="text-white/70 text-sm font-sans leading-relaxed mb-4">
            {persona.subtitle}
          </p>
          <p className="text-white/50 text-sm font-sans leading-relaxed">
            {persona.description}
          </p>
        </div>

        <div className="mx-6 h-px bg-white/10 mb-6" />

        {/* Destination carousel */}
        <div className="mb-8">
          <p className="px-6 text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            당신을 위한 여행지 — 클릭해서 자세히 보기
          </p>
          <DestinationCarousel destinations={destList} />
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-12 flex flex-col gap-3 mt-auto">
          <Button variant="floating" onClick={() => router.push('/')}>
            다른 여행 성향 다시 테스트하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ResultPage() {
  return (
    <Suspense fallback={
      <div className="animated-bg flex items-center justify-center min-h-dvh">
        <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-accent animate-spin" />
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
```

Create `src/views/result/index.ts`:

```ts
export { ResultPage } from './ui/ResultPage'
```

- [ ] **Step 3: Create /result route**

Create `src/app/result/page.tsx`:

```tsx
import { ResultPage } from '@/views/result'

export default function Page() {
  return <ResultPage />
}
```

- [ ] **Step 4: Commit**

```bash
git add src/views/result/ src/app/result/ src/widgets/destination-carousel/
git commit -m "feat: /result page with persona display and clickable destination carousel"
```

---

### Task 10: Destination detail page at /destination/[id]

**Files:**
- Create: `src/views/destination/ui/DestinationPage.tsx`
- Create: `src/views/destination/index.ts`
- Create: `src/app/destination/[id]/page.tsx`

- [ ] **Step 1: Create DestinationPage**

Create `src/views/destination/ui/DestinationPage.tsx`:

```tsx
'use client'
import { useRouter } from 'next/navigation'
import { VideoBackground } from '@/shared/ui/VideoBackground'
import { Button } from '@/shared/ui/Button'
import type { Destination } from '@/entities/destination/model/types'

type DestinationPageProps = {
  destination: Destination
}

export function DestinationPage({ destination }: DestinationPageProps) {
  const router = useRouter()

  return (
    <div className="min-h-dvh bg-[#0a0015] text-white">
      {/* Hero video section */}
      <div className="relative h-[55dvh] overflow-hidden">
        <VideoBackground
          src={destination.videoUrl}
          fallbackImageUrl={destination.images[0]}
          overlayOpacity={0.4}
        />
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-10 text-white/70 font-sans text-sm bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 hover:text-white transition-colors"
        >
          ← 돌아가기
        </button>
        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 bg-gradient-to-t from-[#0a0015] to-transparent pt-16">
          <span className="text-xs text-accent font-sans tracking-wider uppercase">
            {destination.region}
          </span>
          <h1 className="font-serif text-2xl text-white mt-2 leading-snug">
            {destination.title}
          </h1>
          <p className="text-white/50 text-xs font-sans mt-2 tracking-wide">
            {destination.mood}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-12 flex flex-col gap-8">
        {/* Description */}
        <p className="text-white/70 font-sans text-sm leading-relaxed">
          {destination.description}
        </p>

        {/* Image gallery */}
        <div>
          <p className="text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            여행지 사진
          </p>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {destination.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${destination.title} ${i + 1}`}
                className="flex-shrink-0 w-48 h-32 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Spots */}
        <div>
          <p className="text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            추천 스팟
          </p>
          <div className="flex flex-col gap-4">
            {destination.spots.map((spot, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-accent font-sans text-sm font-medium mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-white font-sans text-sm font-medium">{spot.name}</p>
                  <p className="text-white/50 font-sans text-xs leading-relaxed mt-1">
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            이런 분께 추천
          </p>
          <div className="flex flex-wrap gap-2">
            {destination.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-sans text-white/70 border border-white/20 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button variant="ghost" onClick={() => router.back()} className="w-full">
          ← 다른 여행지도 보기
        </Button>
      </div>
    </div>
  )
}
```

Create `src/views/destination/index.ts`:

```ts
export { DestinationPage } from './ui/DestinationPage'
```

- [ ] **Step 2: Create /destination/[id] route**

Create `src/app/destination/[id]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { getDestinationById } from '@/entities/destination/data/destinations'
import { DestinationPage } from '@/views/destination'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const destination = getDestinationById(id)
  if (!destination) notFound()
  return <DestinationPage destination={destination} />
}
```

- [ ] **Step 3: Commit**

```bash
git add src/views/destination/ "src/app/destination/"
git commit -m "feat: /destination/[id] page with video hero, gallery, spots, tags"
```

---

### Task 11: Cleanup old files and build verification

**Files:**
- Delete: `src/views/home/`
- Delete: `src/widgets/intro-screen/`
- Delete: `src/widgets/quiz-screen/`
- Delete: `src/widgets/loading-screen/`
- Delete: `src/widgets/result-screen/`
- Also remove ResultScreen import from anywhere

- [ ] **Step 1: Delete old views and widgets**

```bash
git rm -r src/views/home/
git rm -r src/widgets/intro-screen/
git rm -r src/widgets/quiz-screen/
git rm -r src/widgets/loading-screen/
git rm -r src/widgets/result-screen/
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected output: `✓ Compiled successfully` with no TypeScript errors.

If build fails with TypeScript errors, read the error and fix the specific file. Common issues:
- `Persona` type changed (removed `recommendations`, added `destinationIds`) — any file still importing `Recommendation` from `Persona` needs updating
- Old widget imports that no longer exist — remove those imports

- [ ] **Step 3: Commit cleanup and build fix**

```bash
git add -A
git commit -m "chore: remove old home view and single-screen widgets, build passing"
```

---

### Task 12: Push to GitHub

- [ ] **Step 1: Push**

```bash
git push origin main
```

Expected: All commits pushed to `https://github.com/enter-culture/mvp.git`
