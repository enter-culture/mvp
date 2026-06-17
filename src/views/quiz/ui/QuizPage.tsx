'use client'
import { useRouter } from 'next/navigation'
import { useVisualNovel } from '@/features/visual-novel/model/useVisualNovel'
import { DialogueBox } from '@/widgets/dialogue-box/ui/DialogueBox'
import { CardFan } from '@/widgets/card-fan/ui/CardFan'

const DEFAULT_BG = '/assets/wood-bg.png'
const DEFAULT_CHAR = '/assets/wood-sensitivity.png'

export function QuizPage() {
  const router = useRouter()
  const vn = useVisualNovel()

  const bg = vn.selectedCard?.characterBg ?? DEFAULT_BG
  const char = vn.selectedCard?.character ?? DEFAULT_CHAR

  // 칩 선택 단계에서는 캐릭터 영역 축소
  const isChipPhase = vn.phase === 'chips' && vn.bridgeDialogue === null
  const illustHeight = isChipPhase ? '28dvh' : '65dvh'

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
      background: '#07060e',
      maxWidth: '430px',
      margin: '0 auto',
      overflow: 'hidden',
    }}>

      {/* ── 캐릭터 일러스트 ── */}
      <div style={{
        position: 'relative',
        height: illustHeight,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'height 0.5s cubic-bezier(.16,1,.3,1)',
      }}>
        <img src={bg} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, #07060e)' }} />
        <img src={char} alt="" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '90%', objectFit: 'contain' }} />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
          <img src="/assets/logo.png" alt="CULTURE" style={{ height: '26px', cursor: 'pointer', opacity: 0.8 }} onClick={() => router.push('/')} />
        </div>
        <button type="button" onClick={() => router.push('/')} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(7,6,14,0.6)', border: '1px solid #d4a8534d',
          color: '#a8a0be', borderRadius: '9999px', padding: '6px 14px',
          fontSize: '0.8rem', fontFamily: '"Pretendard Variable", sans-serif',
          cursor: 'pointer', backdropFilter: 'blur(8px)',
        }}>← 홈</button>
      </div>

      {/* ── 하단 대화/선택 영역 ── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(to bottom, #07060e 0%, #0f0e1a 100%)',
        borderTop: '1px solid #ffffff0f',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* INTRO */}
        {vn.phase === 'intro' && vn.currentIntroDialogue && (
          <DialogueBox characterName={vn.currentIntroDialogue.character} text={vn.currentIntroDialogue.text} onTap={vn.advanceIntro} />
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
          <DialogueBox characterName="지우" text={vn.bridgeDialogue} onTap={vn.advanceBridge} />
        )}

        {/* WORD TILE SELECTION */}
        {isChipPhase && vn.currentQuestion && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

            {/* 질문 헤더 */}
            <div style={{ padding: '0.75rem 1.25rem 0.5rem', flexShrink: 0 }}>
              <div style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.75rem', color: '#d4a853', marginBottom: '0.35rem', letterSpacing: '0.06em' }}>
                지우 ─────
              </div>
              <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.9rem', color: '#ede9f7', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                {vn.currentQuestion.text}
              </p>
              {/* 선택 카운터 */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem', alignItems: 'center' }}>
                {[1,2,3,4,5].map(n => (
                  <div key={n} style={{
                    width: '20px', height: '4px', borderRadius: '2px',
                    background: n <= vn.selectionCount ? '#d4a853' : '#ffffff0f',
                    transition: 'background 0.25s',
                  }} />
                ))}
                <span style={{ marginLeft: '6px', fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.72rem', color: vn.canProceed ? '#d4a853' : '#635c78', transition: 'color 0.3s' }}>
                  {vn.selectionCount}/5 {!vn.canProceed && `(최소 3개)`}
                </span>
              </div>
            </div>

            {/* 단어 타일 그리드 */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0.5rem 1.25rem 0.75rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              alignContent: 'flex-start',
            }}>
              {vn.currentQuestion.chips.map((chip, i) => {
                const selected = vn.currentAnswers.includes(chip)
                const disabled = vn.maxReached && !selected
                const selOrder = selected ? vn.currentAnswers.indexOf(chip) + 1 : null

                return (
                  <button
                    key={chip}
                    type="button"
                    disabled={disabled}
                    onClick={() => vn.toggleChip(chip)}
                    style={{
                      position: 'relative',
                      background: selected ? '#d4a8531f' : '#0f0e1a',
                      border: `1.5px solid ${selected ? '#d4a853' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: '10px',
                      padding: '10px 6px',
                      fontFamily: '"Noto Serif KR", serif',
                      fontSize: '0.8125rem',
                      color: selected ? '#f0d48a' : '#a8a0be',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      letterSpacing: '0.02em',
                      lineHeight: 1.4,
                      boxShadow: selected ? '0 0 12px #d4a85330' : 'none',
                      opacity: disabled ? 0.35 : 1,
                      transition: 'background 0.2s, border 0.2s, color 0.2s, box-shadow 0.2s, opacity 0.2s, transform 0.15s',
                      transform: selected ? 'scale(1.02)' : 'scale(1)',
                      animation: `tileIn 0.3s cubic-bezier(.16,1,.3,1) ${i * 18}ms both`,
                    }}
                  >
                    {/* 선택 순서 뱃지 */}
                    {selOrder && (
                      <span style={{
                        position: 'absolute',
                        top: '-6px', right: '-6px',
                        width: '16px', height: '16px',
                        background: '#d4a853',
                        color: '#07060e',
                        borderRadius: '50%',
                        fontSize: '0.6rem',
                        fontFamily: '"Pretendard Variable", sans-serif',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {selOrder}
                      </span>
                    )}
                    {chip}
                  </button>
                )
              })}
            </div>

            {/* 다음 버튼 */}
            <div style={{ padding: '0.625rem 1.25rem 0.875rem', borderTop: '1px solid #ffffff0f', flexShrink: 0 }}>
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
                  background: vn.canProceed ? '#d4a853' : '#15132a',
                  color: vn.canProceed ? '#07060e' : '#3d3656',
                  fontFamily: '"Noto Serif KR", serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  padding: '0.875rem',
                  border: `1px solid ${vn.canProceed ? 'transparent' : '#ffffff0a'}`,
                  cursor: vn.canProceed ? 'pointer' : 'not-allowed',
                  transition: 'all 0.25s',
                  boxShadow: vn.canProceed ? '0 0 24px #d4a85340' : 'none',
                  letterSpacing: '0.04em',
                }}
              >
                {vn.isLastChipStep ? '여행지 알아보기 →' : '다음으로 →'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes tileIn {
          from { opacity: 0; transform: translateY(6px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
