'use client'
import { useState, useEffect, useRef } from 'react'
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
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [])

  useEffect(() => {
    setVisible(true)
  }, [step])

  function handleNext() {
    const result = nextStep()
    if (result.done) {
      onComplete(result.persona)
    } else {
      setVisible(false)
      transitionTimerRef.current = setTimeout(() => setVisible(true), 50)
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
