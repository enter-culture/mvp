# Travel Quiz App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an AI-style travel personality quiz web app with 4 screens (Intro → Quiz → Loading → Result) using Next.js 14 App Router, FSD architecture, Tailwind CSS, and CSS animations.

**Architecture:** Single-page state machine in `HomePage.tsx` manages `screen` state (`intro | quiz | loading | result`). Each screen is a self-contained FSD widget. Entities hold typed dummy data; features hold quiz logic (hook + persona mapping); shared/ui holds reusable primitives.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Pretendard + NanumMyeongjo fonts (CDN), clsx + tailwind-merge, Vercel deployment

---

## File Map

```
src/
├── app/
│   ├── layout.tsx                              modify
│   ├── page.tsx                                modify
│   └── globals.css                             modify
├── pages/home/
│   ├── ui/HomePage.tsx                         create
│   └── index.ts                                create
├── widgets/
│   ├── intro-screen/ui/IntroScreen.tsx         create
│   ├── intro-screen/index.ts                   create
│   ├── quiz-screen/ui/QuizScreen.tsx           create
│   ├── quiz-screen/index.ts                    create
│   ├── loading-screen/ui/LoadingScreen.tsx     create
│   ├── loading-screen/index.ts                 create
│   ├── result-screen/ui/ResultScreen.tsx       create
│   └── result-screen/index.ts                  create
├── features/quiz-flow/
│   ├── model/useQuizFlow.ts                    create
│   └── lib/getPersona.ts                       create
├── entities/
│   ├── question/model/types.ts                 create
│   ├── question/data/questions.ts              create
│   ├── persona/model/types.ts                  create
│   ├── persona/data/personas.ts               create
│   ├── recommendation/model/types.ts           create
│   └── recommendation/data/recommendations.ts create
└── shared/
    ├── ui/Button/Button.tsx                    create
    ├── ui/Button/index.ts                      create
    ├── ui/Chip/Chip.tsx                        create
    ├── ui/Chip/index.ts                        create
    ├── ui/Card/Card.tsx                        create
    ├── ui/Card/index.ts                        create
    ├── ui/ProgressBar/ProgressBar.tsx          create
    ├── ui/ProgressBar/index.ts                 create
    ├── ui/GlassBox/GlassBox.tsx               create
    ├── ui/GlassBox/index.ts                    create
    ├── lib/cn.ts                               create
    └── config/theme.ts                         create
```

---

### Task 1: Project Initialization

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` (auto-generated)

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/sinseongsu/Desktop/culture
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

When prompted:
- Would you like to use Turbopack? → No

- [ ] **Step 2: Install utilities**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```
Expected: Server at http://localhost:3000 with default Next.js page visible. Ctrl+C to stop.

- [ ] **Step 4: Commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js 14 project with TypeScript and Tailwind"
```

---

### Task 2: FSD Directory Structure

**Files:**
- Create: all FSD layer directories

- [ ] **Step 1: Create directories**

```bash
mkdir -p src/pages/home/ui
mkdir -p src/widgets/intro-screen/ui
mkdir -p src/widgets/quiz-screen/ui
mkdir -p src/widgets/loading-screen/ui
mkdir -p src/widgets/result-screen/ui
mkdir -p src/features/quiz-flow/model
mkdir -p src/features/quiz-flow/lib
mkdir -p src/entities/question/model
mkdir -p src/entities/question/data
mkdir -p src/entities/persona/model
mkdir -p src/entities/persona/data
mkdir -p src/entities/recommendation/model
mkdir -p src/entities/recommendation/data
mkdir -p src/shared/ui/Button
mkdir -p src/shared/ui/Chip
mkdir -p src/shared/ui/Card
mkdir -p src/shared/ui/ProgressBar
mkdir -p src/shared/ui/GlassBox
mkdir -p src/shared/lib
mkdir -p src/shared/config
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "chore: set up FSD directory structure"
```

---

### Task 3: Global Styles & Fonts

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace globals.css**

Replace entire contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

:root {
  --color-accent: #c9a96e;
  --color-accent-glow: rgba(201, 169, 110, 0.4);
  --color-glass: rgba(255, 255, 255, 0.08);
  --color-glass-border: rgba(255, 255, 255, 0.15);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Pretendard', -apple-system, sans-serif;
  background: #0a0015;
  color: #f0ece6;
  min-height: 100dvh;
  overflow-x: hidden;
}

@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-bg {
  background: linear-gradient(135deg, #0a0015 0%, #1a0535 25%, #2d1b69 50%, #1a0535 75%, #0a0015 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 12px var(--color-accent-glow); }
  50%       { box-shadow: 0 0 28px var(--color-accent-glow), 0 0 50px var(--color-accent-glow); }
}
.glow-pulse { animation: glowPulse 2s ease-in-out infinite; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.5s ease forwards; }

@keyframes chipGlow {
  0%, 100% { box-shadow: 0 0 6px var(--color-accent-glow); }
  50%       { box-shadow: 0 0 16px var(--color-accent-glow); }
}
.chip-selected-glow { animation: chipGlow 1.5s ease-in-out infinite; }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
.typing-cursor::after {
  content: '|';
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 2: Replace tailwind.config.ts**

Replace entire contents of `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        accent: '#c9a96e',
      },
      fontFamily: {
        serif: ['"Nanum Myeongjo"', 'Georgia', 'serif'],
        sans: ['Pretendard', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Replace layout.tsx**

Replace entire contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '나의 여행 성향 테스트',
  description: '당신의 감성으로 찾는 맞춤형 국내 여행',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```
Open http://localhost:3000 — background should be animated dark purple/indigo gradient. Ctrl+C to stop.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css tailwind.config.ts src/app/layout.tsx
git commit -m "style: global CSS animations, variables, and font setup"
```

---

### Task 4: Shared Utilities

**Files:**
- Create: `src/shared/lib/cn.ts`
- Create: `src/shared/config/theme.ts`

- [ ] **Step 1: Create cn utility**

Create `src/shared/lib/cn.ts`:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Create theme config**

Create `src/shared/config/theme.ts`:

```ts
export const SCREEN_TYPES = ['intro', 'quiz', 'loading', 'result'] as const
export type ScreenType = typeof SCREEN_TYPES[number]
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/lib/cn.ts src/shared/config/theme.ts
git commit -m "feat: add cn utility and ScreenType config"
```

---

### Task 5: Entity Types & Dummy Data

**Files:**
- Create: `src/entities/question/model/types.ts`
- Create: `src/entities/recommendation/model/types.ts`
- Create: `src/entities/persona/model/types.ts`
- Create: `src/entities/question/data/questions.ts`
- Create: `src/entities/persona/data/personas.ts`

- [ ] **Step 1: Create Question type**

Create `src/entities/question/model/types.ts`:

```ts
export type Question = {
  id: number
  text: string
  chips: string[]
  multiSelect: boolean
}
```

- [ ] **Step 2: Create Recommendation type**

Create `src/entities/recommendation/model/types.ts`:

```ts
export type RecommendationCategory = '숙박' | '액티비티' | '체험'

export type Recommendation = {
  id: string
  region: string
  title: string
  category: RecommendationCategory
  imageUrl: string
}
```

- [ ] **Step 3: Create Persona type**

Create `src/entities/persona/model/types.ts`:

```ts
import type { Recommendation } from '@/entities/recommendation/model/types'

export type Persona = {
  id: string
  title: string
  subtitle: string
  description: string
  recommendations: Recommendation[]
}
```

- [ ] **Step 4: Create question dummy data**

Create `src/entities/question/data/questions.ts`:

```ts
import type { Question } from '../model/types'

export const questions: Question[] = [
  {
    id: 1,
    text: '잠시 눈을 감고 상상해 보세요.\n주말 국내 여행을 생각했을 때,\n가장 마음이 끌리는 단어는?',
    chips: ['설레는', '홀가분한', '고즈넉한', '활기찬', '따뜻한', '새로운'],
    multiSelect: true,
  },
  {
    id: 2,
    text: '문을 열고 나가면 어떤 풍경이 펼쳐지나요?\n그곳에서 무엇을 하며 머물고 있을까요?',
    chips: ['산속 오두막', '해변 산책', '시골 마을', '도심 골목', '계곡 물놀이', '논밭 사이 카페'],
    multiSelect: true,
  },
  {
    id: 3,
    text: '이번 여행을 함께하고 싶은 \'대상\'과\n채우고 싶은 \'경험\'은?',
    chips: ['혼자만의 시간', '소중한 사람과', '밤샘수다', '맛집 탐방', '사진 찍기', '아무것도 안 하기'],
    multiSelect: true,
  },
]
```

- [ ] **Step 5: Create persona dummy data**

Create `src/entities/persona/data/personas.ts`:

```ts
import type { Persona } from '../model/types'

export const personas: Persona[] = [
  {
    id: 'nopo',
    title: '삼시세끼 노포 정착민',
    subtitle: '화려한 핫플은 사절. 따뜻한 온기가 있는 조용한 시골 마을에서 위로받고 싶은 당신.',
    description:
      '당신은 빠르게 스쳐 지나가는 여행보다, 한 곳에 오래 머물며 그 마을의 냄새와 소리에 스며드는 여행을 사랑합니다. 유명 관광지 대신 골목 끝 낡은 국밥집, 할머니가 직접 담근 김치 한 종지에서 진짜 위로를 찾는 사람. 이번 여행은 아무도 모르는 그 동네 단골이 되어보세요.',
    recommendations: [
      {
        id: 'rec-1',
        region: '전남 구례',
        title: '별 보며 잠드는 빈집 재생 로컬 스테이',
        category: '숙박',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      },
      {
        id: 'rec-2',
        region: '경북 안동',
        title: '대를 이은 시골 장터 국밥집 탐방',
        category: '액티비티',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
      },
      {
        id: 'rec-3',
        region: '충남 예산',
        title: '로컬 양조장에서 막걸리 빚기 클래스',
        category: '체험',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
      },
      {
        id: 'rec-4',
        region: '전북 남원',
        title: '지리산 둘레길 새벽 산책과 민박 조식',
        category: '숙박',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
      },
    ],
  },
  {
    id: 'beach',
    title: '파도 앞 멍 때리기 선수',
    subtitle: '생각이 많아질수록 바다 소리가 그리워지는 당신.',
    description:
      '머릿속이 복잡해질 때, 당신은 본능적으로 물을 찾습니다. 파도 소리가 잡념을 지워주고, 수평선 너머를 바라보다 보면 어느새 마음이 가벼워지죠. 이번 여행은 핫플 카페나 맛집 리스트 대신, 모래사장에 발을 묻고 아무것도 하지 않는 것이 목적입니다.',
    recommendations: [
      {
        id: 'rec-5',
        region: '강원 고성',
        title: '새벽 일출을 혼자 맞이하는 비밀 해변',
        category: '액티비티',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
      },
      {
        id: 'rec-6',
        region: '제주 애월',
        title: '파도 소리 들으며 자는 바다뷰 독채',
        category: '숙박',
        imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
      },
      {
        id: 'rec-7',
        region: '부산 기장',
        title: '해녀 할머니와 함께하는 조개잡이 체험',
        category: '체험',
        imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
      },
    ],
  },
]
```

- [ ] **Step 6: Commit**

```bash
git add src/entities/
git commit -m "feat: entity types and dummy data for questions, personas, recommendations"
```

---

### Task 6: Shared UI — Button & GlassBox

**Files:**
- Create: `src/shared/ui/Button/Button.tsx`
- Create: `src/shared/ui/Button/index.ts`
- Create: `src/shared/ui/GlassBox/GlassBox.tsx`
- Create: `src/shared/ui/GlassBox/index.ts`

- [ ] **Step 1: Create Button**

Create `src/shared/ui/Button/Button.tsx`:

```tsx
'use client'
import { cn } from '@/shared/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'floating'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  glow?: boolean
}

export function Button({
  variant = 'primary',
  glow = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'rounded-full font-sans font-medium transition-all duration-300 cursor-pointer',
        variant === 'primary' && 'bg-accent text-black px-8 py-4 text-base',
        variant === 'ghost' &&
          'border border-accent text-accent px-8 py-4 text-base hover:bg-accent/10',
        variant === 'floating' && 'bg-accent text-black px-10 py-4 text-base w-full',
        glow && 'glow-pulse',
        disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

Create `src/shared/ui/Button/index.ts`:

```ts
export { Button } from './Button'
```

- [ ] **Step 2: Create GlassBox**

Create `src/shared/ui/GlassBox/GlassBox.tsx`:

```tsx
import { cn } from '@/shared/lib/cn'
import type { HTMLAttributes } from 'react'

type GlassBoxProps = HTMLAttributes<HTMLDivElement>

export function GlassBox({ className, children, ...props }: GlassBoxProps) {
  return (
    <div
      className={cn('backdrop-blur-md rounded-2xl', className)}
      style={{
        background: 'var(--color-glass)',
        border: '1px solid var(--color-glass-border)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
```

Create `src/shared/ui/GlassBox/index.ts`:

```ts
export { GlassBox } from './GlassBox'
```

- [ ] **Step 3: Commit**

```bash
git add src/shared/ui/Button src/shared/ui/GlassBox
git commit -m "feat: Button and GlassBox shared UI components"
```

---

### Task 7: Shared UI — Chip, ProgressBar, Card

**Files:**
- Create: `src/shared/ui/Chip/Chip.tsx`
- Create: `src/shared/ui/Chip/index.ts`
- Create: `src/shared/ui/ProgressBar/ProgressBar.tsx`
- Create: `src/shared/ui/ProgressBar/index.ts`
- Create: `src/shared/ui/Card/Card.tsx`
- Create: `src/shared/ui/Card/index.ts`

- [ ] **Step 1: Create Chip**

Create `src/shared/ui/Chip/Chip.tsx`:

```tsx
'use client'
import { cn } from '@/shared/lib/cn'

type ChipProps = {
  label: string
  selected: boolean
  onClick: () => void
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-sans border transition-all duration-200 cursor-pointer',
        selected
          ? 'bg-accent text-black border-accent chip-selected-glow'
          : 'bg-transparent text-white/80 border-white/30 hover:border-accent/60',
      )}
    >
      {label}
    </button>
  )
}
```

Create `src/shared/ui/Chip/index.ts`:

```ts
export { Chip } from './Chip'
```

- [ ] **Step 2: Create ProgressBar**

Create `src/shared/ui/ProgressBar/ProgressBar.tsx`:

```tsx
import { cn } from '@/shared/lib/cn'

type ProgressBarProps = {
  current: number
  total: number
  className?: string
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const pct = (current / total) * 100
  return (
    <div className={cn('w-full', className)}>
      <p className="text-xs text-white/40 mb-2 font-sans">
        {current} / {total}
      </p>
      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
```

Create `src/shared/ui/ProgressBar/index.ts`:

```ts
export { ProgressBar } from './ProgressBar'
```

- [ ] **Step 3: Create Card**

Create `src/shared/ui/Card/Card.tsx`:

```tsx
import { cn } from '@/shared/lib/cn'
import type { Recommendation } from '@/entities/recommendation/model/types'

type CardProps = {
  recommendation: Recommendation
  className?: string
}

export function Card({ recommendation, className }: CardProps) {
  return (
    <div
      className={cn(
        'relative flex-shrink-0 w-60 h-80 rounded-2xl overflow-hidden group',
        className,
      )}
    >
      <img
        src={recommendation.imageUrl}
        alt={recommendation.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs text-accent font-sans font-medium bg-accent/10 border border-accent/30 rounded-full px-2 py-0.5">
          {recommendation.category} · {recommendation.region}
        </span>
        <p className="mt-2 text-white text-sm font-sans font-medium leading-snug">
          {recommendation.title}
        </p>
      </div>
    </div>
  )
}
```

Create `src/shared/ui/Card/index.ts`:

```ts
export { Card } from './Card'
```

- [ ] **Step 4: Commit**

```bash
git add src/shared/ui/Chip src/shared/ui/ProgressBar src/shared/ui/Card
git commit -m "feat: Chip, ProgressBar, Card shared UI components"
```

---

### Task 8: Quiz Flow Feature

**Files:**
- Create: `src/features/quiz-flow/lib/getPersona.ts`
- Create: `src/features/quiz-flow/model/useQuizFlow.ts`

- [ ] **Step 1: Create getPersona**

Create `src/features/quiz-flow/lib/getPersona.ts`:

```ts
import { personas } from '@/entities/persona/data/personas'
import type { Persona } from '@/entities/persona/model/types'

const BEACH_CHIPS = ['해변 산책', '계곡 물놀이']

export function getPersona(answers: string[][]): Persona {
  const flat = answers.flat()
  const hasBeach = flat.some(a => BEACH_CHIPS.includes(a))
  return hasBeach ? personas[1] : personas[0]
}
```

- [ ] **Step 2: Create useQuizFlow hook**

Create `src/features/quiz-flow/model/useQuizFlow.ts`:

```ts
'use client'
import { useState } from 'react'
import { questions } from '@/entities/question/data/questions'
import { getPersona } from '../lib/getPersona'
import type { Persona } from '@/entities/persona/model/types'

type NextResult = { done: false } | { done: true; persona: Persona }

export function useQuizFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[][]>(
    () => questions.map(() => [])
  )

  const currentQuestion = questions[step]
  const currentAnswers = answers[step]
  const canProceed = currentAnswers.length > 0
  const isLastStep = step === questions.length - 1

  function toggleChip(chip: string) {
    setAnswers(prev => {
      const next = prev.map((a, i) => (i === step ? [...a] : a))
      const current = next[step]
      next[step] = current.includes(chip)
        ? current.filter(c => c !== chip)
        : [...current, chip]
      return next
    })
  }

  function nextStep(): NextResult {
    if (isLastStep) {
      return { done: true, persona: getPersona(answers) }
    }
    setStep(s => s + 1)
    return { done: false }
  }

  return {
    step,
    totalSteps: questions.length,
    currentQuestion,
    currentAnswers,
    canProceed,
    isLastStep,
    toggleChip,
    nextStep,
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/quiz-flow/
git commit -m "feat: quiz flow hook and persona mapping logic"
```

---

### Task 9: IntroScreen Widget

**Files:**
- Create: `src/widgets/intro-screen/ui/IntroScreen.tsx`
- Create: `src/widgets/intro-screen/index.ts`

- [ ] **Step 1: Create IntroScreen**

Create `src/widgets/intro-screen/ui/IntroScreen.tsx`:

```tsx
'use client'
import { GlassBox } from '@/shared/ui/GlassBox'
import { Button } from '@/shared/ui/Button'

type IntroScreenProps = {
  onStart: () => void
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="animated-bg relative flex flex-col items-center justify-end min-h-dvh pb-16 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(120,40,200,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(201,169,110,0.08),transparent_50%)]" />

      <div className="relative z-10 w-full max-w-sm fade-in text-center">
        <GlassBox className="p-8 mb-8">
          <p className="text-xs text-accent font-sans tracking-[0.2em] uppercase mb-4">
            Travel DNA Test
          </p>
          <h1 className="font-serif text-2xl text-white leading-snug mb-3">
            이번 주말, 폰 끄고
            <br />
            합법적으로 잠수 타실 분?
          </h1>
          <p className="text-white/50 text-sm font-sans leading-relaxed">
            3가지 질문으로 발견하는
            <br />
            나만의 여행 페르소나
          </p>
        </GlassBox>

        <Button variant="floating" glow onClick={onStart}>
          나의 여행 성향 알아보기
        </Button>
      </div>
    </div>
  )
}
```

Create `src/widgets/intro-screen/index.ts`:

```ts
export { IntroScreen } from './ui/IntroScreen'
```

- [ ] **Step 2: Commit**

```bash
git add src/widgets/intro-screen/
git commit -m "feat: IntroScreen widget"
```

---

### Task 10: QuizScreen Widget

**Files:**
- Create: `src/widgets/quiz-screen/ui/QuizScreen.tsx`
- Create: `src/widgets/quiz-screen/index.ts`

- [ ] **Step 1: Create QuizScreen**

Create `src/widgets/quiz-screen/ui/QuizScreen.tsx`:

```tsx
'use client'
import { useState, useEffect } from 'react'
import { useQuizFlow } from '@/features/quiz-flow/model/useQuizFlow'
import { ProgressBar } from '@/shared/ui/ProgressBar'
import { Chip } from '@/shared/ui/Chip'
import { Button } from '@/shared/ui/Button'
import type { Persona } from '@/entities/persona/model/types'

type QuizScreenProps = {
  onComplete: (persona: Persona) => void
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const {
    step,
    totalSteps,
    currentQuestion,
    currentAnswers,
    canProceed,
    toggleChip,
    nextStep,
  } = useQuizFlow()

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
  }, [step])

  function handleNext() {
    const result = nextStep()
    if (result.done) {
      onComplete(result.persona)
    } else {
      setVisible(false)
      setTimeout(() => setVisible(true), 50)
    }
  }

  return (
    <div className="animated-bg relative flex flex-col min-h-dvh px-6 pt-12 pb-36">
      <div className="relative z-10 w-full max-w-sm mx-auto">
        <ProgressBar current={step + 1} total={totalSteps} className="mb-10" />

        <div className={visible ? 'fade-in' : 'opacity-0'}>
          <p className="font-serif text-xl text-white leading-relaxed mb-8 whitespace-pre-line">
            {currentQuestion.text}
          </p>

          <div className="flex flex-wrap gap-3">
            {currentQuestion.chips.map((chip, i) => (
              <div
                key={chip}
                className="fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Chip
                  label={chip}
                  selected={currentAnswers.includes(chip)}
                  onClick={() => toggleChip(chip)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-20">
        <Button
          variant="floating"
          disabled={!canProceed}
          onClick={handleNext}
          className="max-w-sm"
        >
          다음으로
        </Button>
      </div>
    </div>
  )
}
```

Create `src/widgets/quiz-screen/index.ts`:

```ts
export { QuizScreen } from './ui/QuizScreen'
```

- [ ] **Step 2: Commit**

```bash
git add src/widgets/quiz-screen/
git commit -m "feat: QuizScreen widget with chip selection and step transitions"
```

---

### Task 11: LoadingScreen Widget

**Files:**
- Create: `src/widgets/loading-screen/ui/LoadingScreen.tsx`
- Create: `src/widgets/loading-screen/index.ts`

- [ ] **Step 1: Create LoadingScreen**

Create `src/widgets/loading-screen/ui/LoadingScreen.tsx`:

```tsx
'use client'
import { useState, useEffect } from 'react'

const MESSAGES = [
  '사용자님의 여행 DNA를 분석 중입니다...',
  '어울리는 숨은 명소를 찾고 있어요...',
  '당신만의 여행 페르소나를 완성하고 있어요...',
]

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setMsgIdx(i => (i + 1) % MESSAGES.length),
      1500,
    )
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(onComplete, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="animated-bg relative flex flex-col items-center justify-center min-h-dvh px-6">
      <div className="relative z-10 text-center max-w-xs">
        {/* Spinner */}
        <div className="w-16 h-16 mx-auto mb-10 relative">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        </div>

        <p
          key={msgIdx}
          className="font-serif text-lg text-white/90 leading-relaxed typing-cursor fade-in"
        >
          {MESSAGES[msgIdx]}
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
```

Create `src/widgets/loading-screen/index.ts`:

```ts
export { LoadingScreen } from './ui/LoadingScreen'
```

- [ ] **Step 2: Commit**

```bash
git add src/widgets/loading-screen/
git commit -m "feat: LoadingScreen widget with cycling messages and spinner"
```

---

### Task 12: ResultScreen Widget

**Files:**
- Create: `src/widgets/result-screen/ui/ResultScreen.tsx`
- Create: `src/widgets/result-screen/index.ts`

- [ ] **Step 1: Create ResultScreen**

Create `src/widgets/result-screen/ui/ResultScreen.tsx`:

```tsx
'use client'
import { Card } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import type { Persona } from '@/entities/persona/model/types'

type ResultScreenProps = {
  persona: Persona
  onRestart: () => void
}

export function ResultScreen({ persona, onRestart }: ResultScreenProps) {
  return (
    <div className="animated-bg relative flex flex-col min-h-dvh">
      <div className="relative z-10 flex flex-col min-h-dvh">
        {/* Persona header */}
        <div className="px-6 pt-16 pb-8 fade-in">
          <p className="text-xs text-accent font-sans tracking-[0.2em] uppercase mb-4">
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

        <div className="mx-6 h-px bg-white/10 mb-8" />

        {/* Recommendation carousel */}
        <div className="mb-10">
          <p className="px-6 text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            당신을 위한 맞춤 체험/테마
          </p>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2">
            {persona.recommendations.map(rec => (
              <Card key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-12 flex flex-col gap-3 mt-auto fade-in">
          <Button
            variant="floating"
            onClick={() => alert('준비 중인 기능입니다.')}
          >
            내 결과 이미지로 저장/공유하기
          </Button>
          <Button
            variant="ghost"
            onClick={onRestart}
            className="w-full max-w-sm mx-auto"
          >
            다른 여행 테마 다시 해보기
          </Button>
        </div>
      </div>
    </div>
  )
}
```

Create `src/widgets/result-screen/index.ts`:

```ts
export { ResultScreen } from './ui/ResultScreen'
```

- [ ] **Step 2: Commit**

```bash
git add src/widgets/result-screen/
git commit -m "feat: ResultScreen widget with persona display and recommendation carousel"
```

---

### Task 13: HomePage & App Entry

**Files:**
- Create: `src/pages/home/ui/HomePage.tsx`
- Create: `src/pages/home/index.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HomePage**

Create `src/pages/home/ui/HomePage.tsx`:

```tsx
'use client'
import { useState } from 'react'
import { IntroScreen } from '@/widgets/intro-screen'
import { QuizScreen } from '@/widgets/quiz-screen'
import { LoadingScreen } from '@/widgets/loading-screen'
import { ResultScreen } from '@/widgets/result-screen'
import type { ScreenType } from '@/shared/config/theme'
import type { Persona } from '@/entities/persona/model/types'

export function HomePage() {
  const [screen, setScreen] = useState<ScreenType>('intro')
  const [persona, setPersona] = useState<Persona | null>(null)

  function handleQuizComplete(result: Persona) {
    setPersona(result)
    setScreen('loading')
  }

  function handleRestart() {
    setPersona(null)
    setScreen('intro')
  }

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen onStart={() => setScreen('quiz')} />
      )}
      {screen === 'quiz' && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}
      {screen === 'loading' && (
        <LoadingScreen onComplete={() => setScreen('result')} />
      )}
      {screen === 'result' && persona && (
        <ResultScreen persona={persona} onRestart={handleRestart} />
      )}
    </>
  )
}
```

Create `src/pages/home/index.ts`:

```ts
export { HomePage } from './ui/HomePage'
```

- [ ] **Step 2: Replace app/page.tsx**

Replace entire contents of `src/app/page.tsx` with:

```tsx
import { HomePage } from '@/pages/home'

export default function Page() {
  return <HomePage />
}
```

- [ ] **Step 3: Delete boilerplate files**

```bash
rm -f src/app/favicon.ico public/next.svg public/vercel.svg
```

- [ ] **Step 4: Run full flow**

```bash
npm run dev
```
Open http://localhost:3000. Walk through: Intro → Quiz (3 questions, select chips) → Loading (4s) → Result (scroll carousel). Verify "다시 해보기" returns to Intro.

- [ ] **Step 5: Commit**

```bash
git add src/pages/home/ src/app/page.tsx
git commit -m "feat: wire up HomePage screen state machine and app entry"
```

---

### Task 14: Build & Vercel Deployment

**Files:**
- No code changes

- [ ] **Step 1: Production build**

```bash
npm run build
```
Expected: `✓ Compiled successfully` — no TypeScript errors, no ESLint errors.

If build fails with TypeScript errors, fix them before continuing.

- [ ] **Step 2: Install Vercel CLI**

```bash
npm install -g vercel
```

- [ ] **Step 3: Deploy to Vercel**

```bash
vercel --prod
```
Follow prompts:
- Set up and deploy → Y
- Which scope → select your account
- Link to existing project? → N
- Project name → `culture` (or any name)
- Directory → `./` (default)
- Override settings? → N

Expected output includes a production URL like `https://culture-xxx.vercel.app`

- [ ] **Step 4: Verify live URL**

Open the Vercel URL and walk through the complete flow (Intro → Quiz → Loading → Result). Test on mobile browser too.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: production deployment to Vercel"
```
