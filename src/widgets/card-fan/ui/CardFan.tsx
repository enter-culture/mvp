'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { travelCards } from '@/entities/travel-card/data/travel-cards'
import type { TravelCard } from '@/entities/travel-card/model/types'

type CardFanProps = {
  onSelect: (card: TravelCard) => void
}

// diff = cardIdx - pivot 기준 슬롯
// diff=0: 앞(중앙), diff=1~N: 오른쪽 부채, diff<0: 왼쪽으로 나감
const RIGHT_SLOTS = [
  { tx: 0,   ty: -20, scale: 1,    rot: 0,  z: 7, opacity: 1   }, // 0 (앞)
  { tx: 60,  ty: 0,   scale: 0.88, rot: 8,  z: 6, opacity: 1   },
  { tx: 120, ty: 0,   scale: 0.76, rot: 16, z: 5, opacity: 1   },
  { tx: 180, ty: 0,   scale: 0.64, rot: 24, z: 4, opacity: 0.4 },
  { tx: 240, ty: 0,   scale: 0.52, rot: 32, z: 3, opacity: 0.4 },
  { tx: 300, ty: 0,   scale: 0.40, rot: 40, z: 2, opacity: 0.4 },
  { tx: 360, ty: 0,   scale: 0.28, rot: 48, z: 1, opacity: 0.4 },
]

// diff=-1: 왼쪽으로 빠져나간 직전 카드
const LEFT_EXIT = { tx: -220, ty: 20, scale: 0.5, rot: -20, z: 0, opacity: 0 }

const CARD_W = 140
const TOTAL  = travelCards.length

function getSlot(diff: number) {
  if (diff >= 0 && diff < RIGHT_SLOTS.length) return RIGHT_SLOTS[diff]
  if (diff === -1) return LEFT_EXIT
  // diff < -1 또는 범위 초과: 화면 밖 숨김
  return { ...LEFT_EXIT, tx: -300, opacity: 0, z: 0 }
}

export function CardFan({ onSelect }: CardFanProps) {
  const [pivot, setPivot]         = useState(0)   // 현재 앞에 있는 카드 인덱스
  const [flipped, setFlipped]     = useState<boolean[]>(Array(TOTAL).fill(false))
  const [fanned, setFanned]       = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [uiReady, setUiReady]     = useState(false)

  // 드래그
  const dragX    = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const FLIP_INTERVAL = 90
  const FAN_DELAY     = 700

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < TOTAL; i++) {
      t.push(setTimeout(() => setFlipped(p => { const n=[...p]; n[i]=true; return n }), 180 + i * FLIP_INTERVAL))
    }
    t.push(setTimeout(() => setFanned(true),  180 + TOTAL * FLIP_INTERVAL + FAN_DELAY))
    t.push(setTimeout(() => setUiReady(true), 180 + TOTAL * FLIP_INTERVAL + FAN_DELAY + 350))
    return () => t.forEach(clearTimeout)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragX.current = e.clientX
    trackRef.current?.setPointerCapture(e.pointerId)
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (dragX.current === null) return
    const dx = e.clientX - dragX.current
    dragX.current = null
    if (Math.abs(dx) < 12) return
    if (dx < 0) {
      // 왼쪽 스와이프 → 현재 카드 왼쪽으로 사라지고 다음 카드가 앞으로
      setPivot(p => Math.min(p + 1, TOTAL - 1))
    } else {
      // 오른쪽 스와이프 → 이전 카드가 앞으로
      setPivot(p => Math.max(p - 1, 0))
    }
  }, [])

  function handleSelect() {
    if (selecting) return
    setSelecting(true)
    setTimeout(() => onSelect(travelCards[pivot]), 420)
  }

  return (
    <>
      <style>{`
        @keyframes saju-flip {
          0%   { opacity: 0; transform: rotateY(90deg) scale(0.85); }
          55%  { transform: rotateY(-5deg) scale(1.03); opacity: 1; }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        @keyframes saju-fly {
          0%   { transform: translateY(-20px) scale(1); opacity: 1; }
          45%  { transform: translateY(-90px) scale(1.06); opacity: 1; }
          100% { transform: translateY(-20px) scale(1); opacity: 0; }
        }
        @keyframes saju-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1.5rem 0', width: '100%' }}>

        {/* 팬 래퍼 */}
        <div style={{ width: '100%', transition: 'opacity 0.4s', opacity: selecting ? 0.2 : 1 }}>

          {/* 팬 컨테이너: height 280px, 중앙 정렬, overflow hidden */}
          <div
            ref={trackRef}
            style={{
              touchAction: 'pan-y', userSelect: 'none',
              cursor: fanned ? 'grab' : 'default',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              width: '100%', height: '280px',
              position: 'relative', overflow: 'hidden',
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {/* z 낮은 것(뒤)부터 렌더 */}
            {travelCards
              .map((card, cardIdx) => {
                const diff = cardIdx - pivot
                const slot = getSlot(diff)
                return { card, cardIdx, diff, slot }
              })
              .sort((a, b) => a.slot.z - b.slot.z)
              .map(({ card, cardIdx, diff, slot }) => {
                const isActive  = diff === 0
                const isFlipped = flipped[cardIdx]
                const isVisible = diff >= -1 && diff < RIGHT_SLOTS.length

                // 부채 펼침 전: 스택 (약간씩 밀림)
                const stackTy = Math.max(0, diff) * 2
                const preTransform = `translateY(${stackTy}px) scale(${1 - Math.max(0, diff) * 0.008})`
                const fanTransform = `translateX(${slot.tx}px) translateY(${slot.ty}px) scale(${slot.scale}) rotate(${slot.rot}deg)`

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      if (!fanned || selecting) return
                      if (isActive) handleSelect()
                      else if (diff > 0) setPivot(cardIdx)   // 오른쪽 카드 클릭 → 앞으로
                    }}
                    style={{
                      position: 'absolute',
                      left: `calc(50% - ${CARD_W / 2}px)`,  // 중앙 기준
                      bottom: 0,
                      width: `${CARD_W}px`,
                      transformOrigin: 'bottom center',
                      transform: fanned ? fanTransform : preTransform,
                      zIndex: slot.z,
                      opacity: isVisible ? (isFlipped || !fanned ? slot.opacity : 0) : 0,
                      cursor: fanned && isVisible ? 'pointer' : 'default',
                      transition: 'transform 0.45s cubic-bezier(.16,1,.3,1), opacity 0.35s ease',
                      animation: selecting && isActive ? 'saju-fly 0.42s cubic-bezier(.4,0,.2,1) forwards' : 'none',
                      pointerEvents: isVisible ? 'auto' : 'none',
                      filter: isActive && fanned
                        ? 'drop-shadow(0 8px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 12px #d4a85340)'
                        : 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                    }}
                  >
                    <div style={{ width: '100%', position: 'relative' }}>

                      {/* 뒷면 */}
                      <div style={{
                        position: 'absolute', inset: 0, zIndex: 2,
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #1a1832 0%, #0f0e1a 50%, #1a1832 100%)',
                        border: '2px solid #d4a853',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                        backfaceVisibility: 'hidden',
                        opacity: isFlipped ? 0 : 1,
                        transform: isFlipped ? 'rotateY(90deg)' : 'rotateY(0deg)',
                        transition: 'transform 0.28s ease, opacity 0.25s ease',
                      }}>
                        <span style={{ fontSize: '1.2rem', color: '#d4a85350' }}>✦</span>
                      </div>

                      {/* 앞면 */}
                      <div style={{
                        borderRadius: '8px', overflow: 'hidden', position: 'relative',
                        backfaceVisibility: 'hidden',
                        boxShadow: isActive
                          ? '0 16px 48px rgba(0,0,0,0.7), 0 0 24px #d4a85340'
                          : '0 16px 48px rgba(0,0,0,0.7)',
                        opacity: isFlipped ? 1 : 0,
                        transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-90deg)',
                        transition: 'opacity 0.3s ease 0.08s, transform 0.32s ease 0.06s, box-shadow 0.3s',
                        animation: isFlipped && !fanned ? 'saju-flip 0.45s cubic-bezier(.16,1,.3,1) both' : 'none',
                      }}>
                        <img
                          src={card.image}
                          alt={card.label}
                          draggable={false}
                          style={{
                            width: '100%', height: 'auto', display: 'block',
                            pointerEvents: 'none',
                            WebkitMaskImage: 'linear-gradient(#000 0% 55%, transparent 95%)',
                            maskImage: 'linear-gradient(#000 0% 55%, transparent 95%)',
                          }}
                        />
                        <span style={{
                          position: 'absolute', bottom: '10%', left: '10%', right: '10%',
                          textAlign: 'center',
                          fontFamily: '"Noto Serif KR", serif',
                          fontSize: '0.75rem', fontWeight: 700,
                          color: '#f0d48a', letterSpacing: '0.04em',
                          pointerEvents: 'none',
                          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                          textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                        }}>
                          {card.label}
                        </span>
                        {isActive && fanned && (
                          <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'linear-gradient(105deg, transparent 30%, rgba(212,168,83,0.15) 50%, transparent 70%)',
                            backgroundSize: '200% 100%',
                            animation: 'saju-shimmer 2.5s ease-in-out infinite',
                          }} />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* 버튼 영역 */}
        <div style={{
          width: '100%', padding: '0 1.25rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
          opacity: uiReady ? 1 : 0,
          transform: uiReady ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.9rem', color: '#f0d48a', fontWeight: 700, marginBottom: '3px', transition: 'all 0.3s' }}>
              {travelCards[pivot].label}
            </p>
            <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.75rem', color: '#635c78', transition: 'all 0.3s' }}>
              {travelCards[pivot].mood}
            </p>
          </div>

          <button type="button" onClick={handleSelect} style={{
            width: '100%', background: '#d4a853', color: '#07060e',
            fontFamily: '"Noto Serif KR", serif', fontSize: '1.0625rem', fontWeight: 700,
            borderRadius: '9999px', padding: '1rem 1.5rem', border: 'none', cursor: 'pointer',
            letterSpacing: '0.04em', boxShadow: '0 0 30px #d4a85340',
            transition: 'filter 0.15s, transform 0.12s',
          }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            이 카드 선택하기
          </button>

          <button type="button" onClick={() => setPivot(p => Math.min(p + 1, TOTAL - 1))} style={{
            background: 'transparent', border: 'none', color: '#635c78',
            fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.85rem',
            cursor: 'pointer', padding: '4px 0', letterSpacing: '0.02em',
          }}>
            다른 카드 보기
          </button>
        </div>
      </div>
    </>
  )
}
