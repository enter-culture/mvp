'use client'
import { useState, useEffect } from 'react'
import { travelCards } from '@/entities/travel-card/data/travel-cards'
import type { TravelCard } from '@/entities/travel-card/model/types'

type CardFanProps = {
  onSelect: (card: TravelCard) => void
}

// 부채 배열 포지션
const CARD_SLOTS = [
  { transform: 'translateY(-24px)',                                    zIndex: 7, opacity: 1   },
  { transform: 'translateX(68px) scale(0.88) rotate(8deg)',           zIndex: 6, opacity: 1   },
  { transform: 'translateX(132px) scale(0.76) rotate(16deg)',         zIndex: 5, opacity: 1   },
  { transform: 'translateX(196px) scale(0.64) rotate(24deg)',         zIndex: 4, opacity: 0.35 },
  { transform: 'translateX(-68px) scale(0.88) rotate(-8deg)',         zIndex: 6, opacity: 1   },
  { transform: 'translateX(-132px) scale(0.76) rotate(-16deg)',       zIndex: 5, opacity: 1   },
  { transform: 'translateX(-196px) scale(0.64) rotate(-24deg)',       zIndex: 4, opacity: 0.35 },
]

// 딜링 시작 위치: 카드가 뒤집히며 날아오르는 기준점
const DEAL_START = 'translateY(60px) scale(0.45) rotate(0deg)'

export function CardFan({ onSelect }: CardFanProps) {
  const [hoveredIdx, setHoveredIdx] = useState(0)
  const [selected, setSelected] = useState<TravelCard | null>(null)
  const [dealtCards, setDealtCards] = useState<Set<number>>(new Set())
  const [animDone, setAnimDone] = useState(false)

  // 카드 딜링 애니메이션: 80ms 간격으로 하나씩 등장
  useEffect(() => {
    const DEAL_INTERVAL = 80
    const timers: ReturnType<typeof setTimeout>[] = []

    travelCards.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setDealtCards(prev => new Set([...prev, i]))
        }, 120 + i * DEAL_INTERVAL)
      )
    })

    // 모든 카드 딜 완료 후 hover 트랜지션 정상화
    timers.push(
      setTimeout(() => setAnimDone(true), 120 + travelCards.length * DEAL_INTERVAL + 600)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  function handleSelect() {
    const card = travelCards[hoveredIdx]
    setSelected(card)
    setTimeout(() => onSelect(card), 350)
  }

  // 선택된 카드를 슬롯 0(앞)에 배치
  const orderedIndices = [
    hoveredIdx,
    ...travelCards.map((_, i) => i).filter(i => i !== hoveredIdx),
  ]

  return (
    <>
      <style>{`
        @keyframes cardFlipIn {
          0%   { opacity: 0; transform: translateY(60px) scale(0.45) rotateY(90deg); }
          40%  { opacity: 1; transform: translateY(-8px) scale(1.06) rotateY(0deg); }
          100% { opacity: 1; transform: var(--card-final-transform); }
        }
        @keyframes cardShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        {/* 부채 카드 영역 */}
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '196px',
            margin: '0 auto',
            perspective: '600px',
          }}
        >
          {orderedIndices.map((cardIdx, slotIdx) => {
            const card = travelCards[cardIdx]
            const slot = CARD_SLOTS[slotIdx] ?? CARD_SLOTS[CARD_SLOTS.length - 1]
            const isActive = slotIdx === 0
            const isDealt = dealtCards.has(cardIdx)

            // 딜링 중: 순서별 딜레이로 등장 / 딜링 완료: 즉시 트랜지션
            const transitionDelay = animDone ? 0 : cardIdx * 60
            const transition = `transform 0.55s cubic-bezier(.16,1,.3,1) ${transitionDelay}ms, opacity 0.35s ease ${transitionDelay}ms, box-shadow 0.3s`

            return (
              <div
                key={card.id}
                onClick={() => {
                  if (isActive) handleSelect()
                  else setHoveredIdx(cardIdx)
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '120px',
                  height: '176px',
                  transform: isDealt ? slot.transform : DEAL_START,
                  opacity: isDealt ? (selected && !isActive ? 0.2 : slot.opacity) : 0,
                  zIndex: slot.zIndex,
                  cursor: 'pointer',
                  transition,
                  transformOrigin: 'bottom center',
                }}
              >
                {/* 카드 내부 */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: isActive ? '2px solid #d4a853' : '2px solid rgba(255,255,255,0.06)',
                    boxShadow: isActive
                      ? '0 0 24px #d4a85370, 0 8px 24px rgba(0,0,0,0.6)'
                      : '0 4px 16px rgba(0,0,0,0.5)',
                    transition: 'border 0.3s, box-shadow 0.3s',
                    position: 'relative',
                  }}
                >
                  {/* 카드 이미지 */}
                  <img
                    src={card.image}
                    alt={card.label}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '142px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {/* 카드 라벨 */}
                  <div
                    style={{
                      background: '#0b0a18',
                      padding: '6px 4px',
                      textAlign: 'center',
                      fontFamily: '"Noto Serif KR", serif',
                      fontSize: '0.68rem',
                      color: isActive ? '#f0d48a' : '#635c78',
                      letterSpacing: '0.04em',
                      transition: 'color 0.3s',
                    }}
                  >
                    {card.label}
                  </div>

                  {/* 선택된 카드에 shimmer 효과 */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(105deg, transparent 40%, rgba(212,168,83,0.15) 50%, transparent 60%)',
                        backgroundSize: '200% 100%',
                        animation: 'cardShimmer 2.5s ease-in-out infinite',
                        pointerEvents: 'none',
                        borderRadius: '12px',
                      }}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* 선택 정보 + 버튼 */}
        <div
          style={{
            textAlign: 'center',
            opacity: animDone ? 1 : 0,
            transform: animDone ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <p style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '0.9375rem',
            color: '#f0d48a',
            marginBottom: '4px',
            minHeight: '1.4rem',
          }}>
            {travelCards[hoveredIdx].label}
          </p>
          <p style={{
            fontFamily: '"Pretendard Variable", sans-serif',
            fontSize: '0.75rem',
            color: '#635c78',
            marginBottom: '1rem',
            minHeight: '1.2rem',
          }}>
            {travelCards[hoveredIdx].mood}
          </p>
          <button
            type="button"
            onClick={handleSelect}
            style={{
              background: '#d4a853',
              color: '#07060e',
              fontFamily: '"Noto Serif KR", serif',
              fontSize: '1rem',
              fontWeight: 700,
              borderRadius: '9999px',
              padding: '0.875rem 2rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 24px #d4a85340',
              width: '100%',
              maxWidth: '280px',
              transition: 'filter 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            이 카드 선택하기
          </button>
          <button
            type="button"
            onClick={() => setHoveredIdx(prev => (prev + 1) % travelCards.length)}
            style={{
              background: 'transparent',
              color: '#635c78',
              fontFamily: '"Pretendard Variable", sans-serif',
              fontSize: '0.8rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '0.75rem',
              display: 'block',
              width: '100%',
              textAlign: 'center',
              padding: '4px 0',
            }}
          >
            다른 카드 보기 →
          </button>
        </div>
      </div>
    </>
  )
}
