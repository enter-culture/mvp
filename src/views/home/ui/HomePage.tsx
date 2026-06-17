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
