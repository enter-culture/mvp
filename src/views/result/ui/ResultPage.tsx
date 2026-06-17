'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { getPersonaById, personas } from '@/entities/persona/data/personas'
import { getDestinationsByPersona } from '@/entities/destination/data/destinations'
import { DestinationCarousel } from '@/widgets/destination-carousel'
import { Button } from '@/shared/ui/Button'

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const personaId = searchParams.get('persona') ?? 'nopo'
  const persona = getPersonaById(personaId) ?? personas[0]
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
    <Suspense
      fallback={
        <div className="animated-bg flex items-center justify-center min-h-dvh">
          <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-accent animate-spin" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
