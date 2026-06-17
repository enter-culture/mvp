'use client'
import { useState, useEffect } from 'react'

const MESSAGES = [
  '사용자님의 여행 DNA를 분석 중입니다...',
  '어울리는 숨은 명소를 찾고 있어요...',
  '당신만의 여행 페르소나를 완성하고 있어요...',
]

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setMsgIdx(i => (i + 1) % MESSAGES.length),
      1500,
    )
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(onComplete, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="animated-bg relative flex flex-col items-center justify-center min-h-dvh px-6">
      <div className="relative z-10 text-center max-w-xs">
        <div className="w-16 h-16 mx-auto mb-10 relative">
          <div className="absolute inset-0 rounded-full border-2 border-accent/20" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        </div>

        <p
          key={msgIdx}
          className="font-serif text-lg text-white/90 leading-relaxed typing-cursor fade-in"
        >
          {MESSAGES[msgIdx]}
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
