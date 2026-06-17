'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { travelCards } from '@/entities/travel-card/data/travel-cards'
import type { TravelCard } from '@/entities/travel-card/model/types'

type CardFanProps = {
  onSelect: (card: TravelCard) => void
}


const SLOTS = [
  { tx: 0,   ty: -20, scale: 1,    rot: 0,  z: 7, opacity: 1   },
  { tx: 60,  ty: 0,   scale: 0.88, rot: 8,  z: 6, opacity: 1   },
  { tx: 120, ty: 0,   scale: 0.76, rot: 16, z: 5, opacity: 1   },
  { tx: 180, ty: 0,   scale: 0.64, rot: 24, z: 4, opacity: 0.4 },
  { tx: 240, ty: 0,   scale: 0.52, rot: 32, z: 3, opacity: 0.4 },
  { tx: 300, ty: 0,   scale: 0.40, rot: 40, z: 2, opacity: 0.4 },
  { tx: 360, ty: 0,   scale: 0.28, rot: 48, z: 1, opacity: 0.4 },
]

const CARD_W = 160
const TOTAL = travelCards.length
const FLIP_INTERVAL = 100   // ms between each card flip
const FAN_DELAY = 800       // ms after last flip before fanning out

export function CardFan({ onSelect }: CardFanProps) {
  const [frontIdx, setFrontIdx] = useState(0)           // 앞에 보이는 카드 인덱스
  const [flipped, setFlipped] = useState<boolean[]>(Array(TOTAL).fill(false))  // 각 카드 앞면 노출 여부
  const [fanned, setFanned] = useState(false)            // 부채 펼침 완료
  const [selecting, setSelecting] = useState(false)      // 선택 애니메이션 중
  const [uiReady, setUiReady] = useState(false)          // 버튼/텍스트 표시

  // 드래그 스와이프
  const dragStart = useRef<number | null>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    // 1단계: 카드 하나씩 뒤집기
    for (let i = 0; i < TOTAL; i++) {
      timers.push(setTimeout(() => {
        setFlipped(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, 200 + i * FLIP_INTERVAL))
    }

    // 2단계: 모두 뒤집힌 후 부채 펼치기
    timers.push(setTimeout(() => {
      setFanned(true)
    }, 200 + TOTAL * FLIP_INTERVAL + FAN_DELAY))

    // 3단계: 버튼 노출
    timers.push(setTimeout(() => {
      setUiReady(true)
    }, 200 + TOTAL * FLIP_INTERVAL + FAN_DELAY + 400))

    return () => timers.forEach(clearTimeout)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStart.current = e.clientX
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStart.current === null) return
    const dx = e.clientX - dragStart.current
    dragStart.current = null
    if (Math.abs(dx) < 8) return
    if (dx < 0) setFrontIdx(i => Math.min(i + 1, TOTAL - 1))  // 왼쪽 스와이프 → 다음 카드
    else        setFrontIdx(i => Math.max(i - 1, 0))           // 오른쪽 스와이프 → 이전 카드
  }, [])

  function handleCardClick(cardIdx: number, slotPos: number) {
    if (!fanned || selecting) return
    if (slotPos === 0) {
      // 앞 카드 선택
      setSelecting(true)
      setTimeout(() => onSelect(travelCards[frontIdx]), 450)
    } else {
      // 다른 카드를 앞으로
      const target = (frontIdx + slotPos) % TOTAL
      setFrontIdx(target)
    }
  }

  // 순환 인덱스: frontIdx가 슬롯 0
  const slotOrder = Array.from({ length: TOTAL }, (_, s) => (frontIdx + s) % TOTAL)

  return (
    <>
      <style>{`
        @keyframes cardFlipReveal {
          0%   { transform: rotateY(90deg) scale(0.8); opacity: 0; }
          55%  { transform: rotateY(-8deg) scale(1.04); opacity: 1; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        @keyframes cardSelectFlyUp {
          0%   { transform: translateY(-20px) scale(1); }
          40%  { transform: translateY(-80px) scale(1.08); }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes uiFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', width: '100%' }}>

        {/* 카드 팬 영역 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '260px',
            touchAction: 'pan-y',
            userSelect: 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* 카드들 - 슬롯 순서대로 렌더 (z-index 낮은 것부터) */}
          {[...slotOrder].reverse().map((cardIdx, reversedSlot) => {
            const slotPos = TOTAL - 1 - reversedSlot
            const slot = SLOTS[slotPos] ?? SLOTS[SLOTS.length - 1]
            const card = travelCards[cardIdx]
            const isActive = slotPos === 0
            const isFlipped = flipped[cardIdx]

            // 부채 펼침 전: 모두 중앙 스택
            const transform = fanned
              ? `translateX(${slot.tx}px) translateY(${slot.ty}px) scale(${slot.scale}) rotate(${slot.rot}deg)`
              : `translateX(${isActive ? 0 : 4}px) translateY(${isActive ? 0 : slotPos * 2}px) scale(${isActive ? 1 : 0.98 - slotPos * 0.01})`

            const fanTransition = fanned
              ? `transform 0.55s cubic-bezier(.16,1,.3,1) ${slotPos * 40}ms, opacity 0.4s ease ${slotPos * 30}ms`
              : 'transform 0.3s ease'

            const selectAnim = selecting && isActive
              ? 'cardSelectFlyUp 0.45s cubic-bezier(.4,0,.2,1) forwards'
              : 'none'

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(cardIdx, slotPos)}
                style={{
                  position: 'absolute',
                  left: '16px',
                  bottom: '0',
                  width: `${CARD_W}px`,
                  transformOrigin: 'bottom center',
                  transform,
                  zIndex: slot.z,
                  opacity: selecting && !isActive ? 0.15 : slot.opacity,
                  transition: fanTransition,
                  animation: selectAnim,
                  cursor: fanned ? 'pointer' : 'default',
                  filter: isActive && fanned
                    ? 'drop-shadow(0 8px 30px rgba(0,0,0,0.8)) drop-shadow(0 0 16px #d4a85360)'
                    : 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))',
                }}
              >
                {/* 카드 flip wrapper */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '140%',
                    perspective: '600px',
                  }}
                >
                  {/* 카드 뒷면 (초기 상태) */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #1a1832 0%, #0f0e1a 50%, #1a1832 100%)',
                      border: '2px solid #d4a853',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                      backfaceVisibility: 'hidden',
                      opacity: isFlipped ? 0 : 1,
                      transform: isFlipped ? 'rotateY(90deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', opacity: 0.4 }}>✦</span>
                  </div>

                  {/* 카드 앞면 */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backfaceVisibility: 'hidden',
                      boxShadow: isActive
                        ? '0 16px 48px rgba(0,0,0,0.8), 0 0 24px #d4a85340'
                        : '0 8px 24px rgba(0,0,0,0.6)',
                      border: isActive ? '2px solid #d4a853' : '2px solid rgba(255,255,255,0.06)',
                      opacity: isFlipped ? 1 : 0,
                      transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-90deg)',
                      transition: 'transform 0.35s ease 0.1s, opacity 0.3s ease 0.1s, box-shadow 0.3s, border 0.3s',
                      animation: isFlipped && !fanned ? `cardFlipReveal 0.5s cubic-bezier(.16,1,.3,1) both` : 'none',
                    }}
                  >
                    <img
                      src={card.image}
                      alt={card.label}
                      draggable={false}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* 라벨 오버레이 */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8%',
                        left: '8%',
                        right: '8%',
                        textAlign: 'center',
                        fontFamily: '"Noto Serif KR", serif',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#f0d48a',
                        letterSpacing: '0.04em',
                        textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {card.label}
                    </div>
                    {/* shimmer */}
                    {isActive && fanned && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(105deg, transparent 30%, rgba(212,168,83,0.18) 50%, transparent 70%)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmerSlide 2.5s ease-in-out infinite',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 카드 정보 + 버튼 */}
        <div
          style={{
            width: '100%',
            paddingRight: '1rem',
            opacity: uiReady ? 1 : 0,
            transform: uiReady ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <p style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: '1rem',
            color: '#f0d48a',
            marginBottom: '4px',
            letterSpacing: '0.04em',
          }}>
            {travelCards[frontIdx].label}
          </p>
          <p style={{
            fontFamily: '"Pretendard Variable", sans-serif',
            fontSize: '0.8rem',
            color: '#635c78',
            marginBottom: '1rem',
          }}>
            {travelCards[frontIdx].mood}
          </p>

          <button
            type="button"
            onClick={() => {
              if (selecting) return
              setSelecting(true)
              setTimeout(() => onSelect(travelCards[frontIdx]), 450)
            }}
            style={{
              width: '100%',
              background: '#d4a853',
              color: '#07060e',
              fontFamily: '"Noto Serif KR", serif',
              fontSize: '1.0625rem',
              fontWeight: 700,
              borderRadius: '9999px',
              padding: '1rem 1.5rem',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.04em',
              boxShadow: '0 0 30px #d4a85340',
              transition: 'filter 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            이 카드 선택하기
          </button>

          <button
            type="button"
            onClick={() => setFrontIdx(i => (i + 1) % TOTAL)}
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
              letterSpacing: '0.02em',
            }}
          >
            다른 카드 보기 →
          </button>
        </div>
      </div>
    </>
  )
}
