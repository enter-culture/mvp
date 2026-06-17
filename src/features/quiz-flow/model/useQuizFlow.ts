'use client'
import { useState, useRef } from 'react'
import { questions } from '@/entities/question/data/questions'
import { getPersona } from '../lib/getPersona'
import type { Persona } from '@/entities/persona/model/types'

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
  const canProceed = currentAnswers.length > 0
  const isLastStep = step === questions.length - 1

  function toggleChip(chip: string) {
    setAnswers(prev =>
      prev.map((a, i) => {
        if (i !== step) return a
        return a.includes(chip) ? a.filter(c => c !== chip) : [...a, chip]
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
    canProceed,
    isLastStep,
    toggleChip,
    nextStep,
  }
}
