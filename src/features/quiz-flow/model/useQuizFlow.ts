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
