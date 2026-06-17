'use client'
import { useState } from 'react'
import { questions } from '@/entities/question/data/questions'
import { getPersona } from '@/features/quiz-flow/lib/getPersona'
import type { TravelCard } from '@/entities/travel-card/model/types'
import type { Persona } from '@/entities/persona/model/types'

type Phase = 'intro' | 'cards' | 'chips' | 'done'

const INTRO_DIALOGUES = [
  { character: '지우', text: '안녕하세요!\n저는 여행 큐레이터 **지우**예요.' },
  { character: '지우', text: '당신에게 딱 맞는\n국내 여행지를 찾아드릴게요.' },
  { character: '지우', text: '어떤 여행이 끌리세요?\n카드를 하나 골라보세요!' },
]

const CHIP_BRIDGES = [
  '좋은 선택이에요!\n이제 몇 가지 더 여쭤볼게요.',
  '잘 골랐어요!\n다음 질문이에요.',
  '거의 다 왔어요.\n마지막 질문이에요!',
]

const MIN_CHIPS = 3
const MAX_CHIPS = 5

export function useVisualNovel() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [introStep, setIntroStep] = useState(0)
  const [selectedCard, setSelectedCard] = useState<TravelCard | null>(null)
  const [chipStep, setChipStep] = useState(0)
  const [bridgeStep, setBridgeStep] = useState<number | null>(null) // null = showing chips
  const [answers, setAnswers] = useState<string[][]>(() => questions.map(() => []))

  const currentIntroDialogue = INTRO_DIALOGUES[introStep] ?? null
  const isLastIntro = introStep >= INTRO_DIALOGUES.length - 1
  const currentQuestion = questions[chipStep] ?? null
  const currentAnswers = answers[chipStep] ?? []
  const selectionCount = currentAnswers.length
  const canProceed = selectionCount >= MIN_CHIPS
  const maxReached = selectionCount >= MAX_CHIPS
  const isLastChipStep = chipStep >= questions.length - 1

  function advanceIntro() {
    if (introStep < INTRO_DIALOGUES.length - 1) {
      setIntroStep(s => s + 1)
    } else {
      setPhase('cards')
    }
  }

  function selectCard(card: TravelCard) {
    setSelectedCard(card)
    setPhase('chips')
    setBridgeStep(0)
  }

  function toggleChip(chip: string) {
    setAnswers(prev =>
      prev.map((a, i) => {
        if (i !== chipStep) return a
        if (a.includes(chip)) return a.filter(c => c !== chip)
        if (a.length >= MAX_CHIPS) return a
        return [...a, chip]
      })
    )
  }

  function advanceBridge() {
    setBridgeStep(null) // show chips
  }

  function nextChipStep(): { done: boolean; persona?: Persona } {
    if (isLastChipStep) {
      setPhase('done')
      return { done: true, persona: getPersona(answers) }
    }
    setChipStep(s => s + 1)
    setBridgeStep(chipStep + 1) // show bridge dialogue before next chips
    return { done: false }
  }

  return {
    phase,
    introStep,
    currentIntroDialogue,
    isLastIntro,
    selectedCard,
    chipStep,
    bridgeStep,
    currentQuestion,
    currentAnswers,
    selectionCount,
    canProceed,
    maxReached,
    isLastChipStep,
    bridgeDialogue: bridgeStep !== null ? CHIP_BRIDGES[bridgeStep] : null,
    advanceIntro,
    selectCard,
    toggleChip,
    advanceBridge,
    nextChipStep,
  }
}
