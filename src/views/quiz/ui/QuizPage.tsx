'use client'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/cn'
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
        {/* Back to landing */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="text-white/40 font-sans text-sm mb-6 hover:text-white/70 transition-colors"
        >
          ← 뒤로
        </button>

        <ProgressBar current={step + 1} total={totalSteps} className="mb-8" />

        {/* Question */}
        <p className="font-serif text-xl text-white leading-relaxed mb-6 whitespace-pre-line">
          {currentQuestion.text}
        </p>

        {/* Selection count badge */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className={cn(
              'text-xs font-sans px-3 py-1 rounded-full border transition-colors',
              canProceed
                ? 'text-accent border-accent/50 bg-accent/10'
                : 'text-white/40 border-white/20',
            )}
          >
            {selectionCount} / 최대 5개 선택
          </span>
          {maxReached && (
            <span className="text-xs text-white/40 font-sans">최대 선택 완료</span>
          )}
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {currentQuestion.chips.map((chip, i) => (
            <div
              key={chip}
              className="fade-in"
              style={{ animationDelay: `${i * 25}ms` }}
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

      {/* Floating bottom */}
      <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center px-6 z-20 gap-2">
        {!canProceed && (
          <p className="text-white/30 text-xs font-sans">
            {3 - selectionCount}개 더 선택해주세요
          </p>
        )}
        <Button
          variant="floating"
          disabled={!canProceed}
          onClick={handleNext}
          className="max-w-sm"
        >
          {step < totalSteps - 1 ? '다음으로' : '결과 보기 →'}
        </Button>
      </div>
    </div>
  )
}
