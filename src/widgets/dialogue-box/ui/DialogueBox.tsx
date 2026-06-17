'use client'
import { useEffect, useState } from 'react'

type DialogueBoxProps = {
  characterName?: string
  text: string
  onTap?: () => void
  showTapHint?: boolean
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>')
}

export function DialogueBox({ characterName, text, onTap, showTapHint = true }: DialogueBoxProps) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    const plainText = text.replace(/\*\*/g, '').replace(/\*/g, '')
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(plainText.slice(0, i))
      if (i >= plainText.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, 28)
    return () => clearInterval(timer)
  }, [text])

  function handleTap() {
    if (!done) {
      // Skip to end
      const plainText = text.replace(/\*\*/g, '').replace(/\*/g, '')
      setDisplayed(plainText)
      setDone(true)
    } else {
      onTap?.()
    }
  }

  return (
    <div
      onClick={handleTap}
      style={{
        padding: '1.25rem 1.5rem',
        cursor: 'pointer',
        userSelect: 'none',
        minHeight: '100px',
      }}
    >
      {characterName && (
        <div
          style={{
            fontFamily: '"Pretendard Variable", sans-serif',
            fontSize: '0.875rem',
            color: '#d4a853',
            marginBottom: '0.5rem',
            letterSpacing: '0.08em',
          }}
        >
          {characterName} ─────
        </div>
      )}
      <p
        style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: '1.0625rem',
          color: '#ede9f7',
          lineHeight: 1.8,
          whiteSpace: 'pre-line',
        }}
        dangerouslySetInnerHTML={{
          __html: done
            ? renderMarkdown(text)
            : displayed + '<span style="animation:blink 1s step-end infinite;opacity:1">|</span>',
        }}
      />
      {done && showTapHint && onTap && (
        <div
          style={{
            textAlign: 'right',
            marginTop: '0.75rem',
            animation: 'blink 1.2s ease-in-out infinite',
          }}
        >
          <span style={{ fontSize: '1rem', color: '#d4a853' }}>▼</span>
        </div>
      )}
    </div>
  )
}
