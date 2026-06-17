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
