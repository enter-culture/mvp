'use client'
import { useRouter } from 'next/navigation'
import { useVisualNovel } from '@/features/visual-novel/model/useVisualNovel'
import { DialogueBox } from '@/widgets/dialogue-box/ui/DialogueBox'
import { CardFan } from '@/widgets/card-fan/ui/CardFan'
import { Chip } from '@/shared/ui/Chip'

const DEFAULT_BG = '/assets/wood-bg.png'
const DEFAULT_CHAR = '/assets/wood-sensitivity.png'

export function QuizPage() {
  const router = useRouter()
  const vn = useVisualNovel()

  const bg = vn.selectedCard?.characterBg ?? DEFAULT_BG
  const char = vn.selectedCard?.character ?? DEFAULT_CHAR

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#07060e',
        maxWidth: '430px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {/* 상단 65%: 일러스트 */}
      <div
        style={{
          position: 'relative',
          height: '65dvh',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          key={bg}
          src={bg}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'linear-gradient(to bottom, transparent, #07060e)',
          }}
        />
        <img
          key={char}
          src={char}
          alt="travel guide"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '90%',
            objectFit: 'contain',
          }}
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
          <img
            src="/assets/logo.png"
            alt="CULTURE"
            style={{ height: '28px', cursor: 'pointer', opacity: 0.8 }}
            onClick={() => router.push('/')}
          />
        </div>
        <button
          type="button"
          onClick={() => router.push('/')}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(7,6,14,0.6)',
            border: '1px solid #d4a8534d',
            color: '#a8a0be',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '0.8rem',
            fontFamily: '"Pretendard Variable", sans-serif',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          ← 홈
        </button>
      </div>

      {/* 하단 35%: 대화 영역 */}
      <div
        style={{
          flex: 1,
          background: 'linear-gradient(to bottom, #07060e 0%, #0f0e1a 100%)',
          borderTop: '1px solid #ffffff0f',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* INTRO */}
        {vn.phase === 'intro' && vn.currentIntroDialogue && (
          <DialogueBox
            characterName={vn.currentIntroDialogue.character}
            text={vn.currentIntroDialogue.text}
            onTap={vn.advanceIntro}
          />
        )}

        {/* CARD SELECTION */}
        {vn.phase === 'cards' && (
          <div style={{ padding: '1rem 1.5rem', overflowY: 'auto', flex: 1 }}>
            <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.9375rem', color: '#a8a0be', marginBottom: '1rem', lineHeight: 1.7 }}>
              어떤 여행이 끌리세요?<br />
              <span style={{ fontSize: '0.8rem', color: '#635c78' }}>카드를 눌러 선택해보세요</span>
            </p>
            <CardFan onSelect={vn.selectCard} />
          </div>
        )}

        {/* BRIDGE DIALOGUE */}
        {vn.phase === 'chips' && vn.bridgeDialogue !== null && (
          <DialogueBox
            characterName="지우"
            text={vn.bridgeDialogue}
            onTap={vn.advanceBridge}
          />
        )}

        {/* CHIP QUESTION */}
        {vn.phase === 'chips' && vn.bridgeDialogue === null && vn.currentQuestion && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <div style={{ padding: '0.875rem 1.5rem 0.5rem' }}>
              <div style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.8rem', color: '#d4a853', marginBottom: '0.4rem' }}>
                지우 ─────
              </div>
              <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.9rem', color: '#ede9f7', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: '0.5rem' }}>
                {vn.currentQuestion.text}
              </p>
              <span style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                fontFamily: '"Pretendard Variable", sans-serif',
                color: vn.canProceed ? '#d4a853' : '#635c78',
                background: vn.canProceed ? '#d4a8531f' : 'transparent',
                border: `1px solid ${vn.canProceed ? '#d4a8534d' : '#ffffff0f'}`,
                borderRadius: '9999px',
                padding: '2px 10px',
                transition: 'all 0.3s',
              }}>
                {vn.selectionCount} / 최대 5개
              </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1.5rem', display: 'flex', flexWrap: 'wrap', gap: '8px', alignContent: 'flex-start' }}>
              {vn.currentQuestion.chips.map((chip, i) => (
                <div key={chip} style={{ animation: `fadeInUp 0.35s ${i * 18}ms both` }}>
                  <Chip
                    label={chip}
                    selected={vn.currentAnswers.includes(chip)}
                    onClick={() => vn.toggleChip(chip)}
                    disabled={vn.maxReached && !vn.currentAnswers.includes(chip)}
                  />
                </div>
              ))}
            </div>

            <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid #ffffff0f', flexShrink: 0 }}>
              {!vn.canProceed && (
                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#635c78', fontFamily: '"Pretendard Variable", sans-serif', marginBottom: '0.5rem' }}>
                  {3 - vn.selectionCount}개 더 선택해주세요
                </p>
              )}
              <button
                type="button"
                disabled={!vn.canProceed}
                onClick={() => {
                  const result = vn.nextChipStep()
                  if (result.done && result.persona) {
                    router.push(`/result?persona=${result.persona.id}`)
                  }
                }}
                style={{
                  width: '100%',
                  background: vn.canProceed ? '#d4a853' : '#1a1826',
                  color: vn.canProceed ? '#07060e' : '#635c78',
                  fontFamily: '"Noto Serif KR", serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  padding: '0.875rem',
                  border: `1px solid ${vn.canProceed ? 'transparent' : '#ffffff0f'}`,
                  cursor: vn.canProceed ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  boxShadow: vn.canProceed ? '0 0 20px #d4a85340' : 'none',
                }}
              >
                {vn.isLastChipStep ? '여행지 알아보기 →' : '다음으로'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
