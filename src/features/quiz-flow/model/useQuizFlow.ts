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
