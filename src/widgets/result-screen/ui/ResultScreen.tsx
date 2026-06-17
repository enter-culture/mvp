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

        <div className="mb-10">
          <p className="px-6 text-xs text-accent font-sans tracking-[0.15em] uppercase mb-4">
            당신을 위한 맞춤 체험/테마
          </p>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-2">
            {persona.recommendations.map(rec => (
              <Card
                key={rec.id}
                imageUrl={rec.imageUrl}
                imageAlt={rec.title}
                badge={`${rec.category} · ${rec.region}`}
                title={rec.title}
              />
            ))}
          </div>
        </div>

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
