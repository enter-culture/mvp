'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { travelCards } from '@/entities/travel-card/data/travel-cards'
import type { TravelCard } from '@/entities/travel-card/model/types'

type CardFanProps = {
  onSelect: (card: TravelCard) => void
}

// sajuboyz 정확한 슬롯 (중앙 기준, 오른쪽으로 부채)
const SLOTS = [
  { tx: 0,   ty: -20, scale: 1,    rot: 0,  z: 7, opacity: 1   },
  { tx: 60,  ty: 0,   scale: 0.88, rot: 8,  z: 6, opacity: 1   },
  { tx: 120, ty: 0,   scale: 0.76, rot: 16, z: 5, opacity: 1   },
  { tx: 180, ty: 0,   scale: 0.64, rot: 24, z: 4, opacity: 0.4 },
  { tx: 240, ty: 0,   scale: 0.52, rot: 32, z: 3, opacity: 0.4 },
  { tx: 300, ty: 0,   scale: 0.40, rot: 40, z: 2, opacity: 0.4 },
  { tx: 360, ty: 0,   scale: 0.28, rot: 48, z: 1, opacity: 0.4 },
]

const CARD_W = 140
const TOTAL = travelCards.length
const FLIP_INTERVAL = 90
const FAN_DELAY = 700

export function CardFan({ onSelect }: CardFanProps) {
  const [frontIdx, setFrontIdx]   = useState(0)
  const [flipped, setFlipped]     = useState<boolean[]>(Array(TOTAL).fill(false))
  const [fanned, setFanned]       = useState(false)
  const [selecting, setSelecting] = useState(false)
  const [uiReady, setUiReady]     = useState(false)

  // 드래그/터치 스와이프
  const dragX  = useRef<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []
    for (let i = 0; i < TOTAL; i++) {
      t.push(setTimeout(() => setFlipped(p => { const n = [...p]; n[i] = true; return n }), 180 + i * FLIP_INTERVAL))
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
    if (Math.abs(dx) < 10) return
    // 왼쪽 스와이프 → 다음 카드 앞으로, 오른쪽 스와이프 → 이전 카드
    setFrontIdx(i => dx < 0 ? Math.min(i + 1, TOTAL - 1) : Math.max(i - 1, 0))
  }, [])

  function handleSelect() {
    if (selecting) return
    setSelecting(true)
    setTimeout(() => onSelect(travelCards[frontIdx]), 420)
  }

  // frontIdx가 슬롯 0에 오도록 순환
  const slotOrder = Array.from({ length: TOTAL }, (_, s) => (frontIdx + s) % TOTAL)

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

          {/* 팬 컨테이너: 중앙 정렬, height 280px (sajuboyz 동일) */}
          <div
            ref={trackRef}
            style={{
              touchAction: 'pan-y',
              userSelect: 'none',
              cursor: fanned ? 'grab' : 'default',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '280px',
              position: 'relative',
              overflow: 'hidden',
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            {/* z 낮은 것부터 (뒤) → 높은 것(앞) 순서로 렌더 */}
            {[...slotOrder].reverse().map((cardIdx, revSlot) => {
              const slotPos  = TOTAL - 1 - revSlot
              const slot     = SLOTS[slotPos] ?? SLOTS[SLOTS.length - 1]
              const card     = travelCards[cardIdx]
              const isActive = slotPos === 0
              const isFlipped = flipped[cardIdx]

              const stackTy = slotPos * 2
              const transform = fanned
                ? `translateX(${slot.tx}px) translateY(${slot.ty}px) scale(${slot.scale}) rotate(${slot.rot}deg)`
                : `translateY(${stackTy}px) scale(${1 - slotPos * 0.008})`

              const transition = fanned
                ? `transform 0.5s cubic-bezier(.16,1,.3,1) ${slotPos * 35}ms, opacity 0.35s ${slotPos * 25}ms`
                : 'transform 0.25s ease'

              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (!fanned || selecting) return
                    if (isActive) handleSelect()
                    else setFrontIdx(cardIdx)
                  }}
                  style={{
                    // 핵심: 모든 카드의 기준 위치 = 컨테이너 중앙
                    position: 'absolute',
                    left: `calc(50% - ${CARD_W / 2}px)`,
                    bottom: 0,
                    width: `${CARD_W}px`,
                    transformOrigin: 'bottom center',
                    transform,
                    zIndex: slot.z,
                    opacity: slot.opacity,
                    cursor: fanned ? 'pointer' : 'default',
                    transition,
                    animation: selecting && isActive ? 'saju-fly 0.42s cubic-bezier(.4,0,.2,1) forwards' : 'none',
                    filter: isActive && fanned
                      ? 'drop-shadow(0 8px 30px rgba(0,0,0,0.6)) drop-shadow(0 0 12px #d4a85340)'
                      : 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                  }}
                >
                  <div style={{ width: '100%', position: 'relative' }}>

                    {/* 카드 뒷면 */}
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

                    {/* 카드 앞면 */}
                    <div style={{
                      borderRadius: '8px', overflow: 'hidden',
                      position: 'relative',
                      backfaceVisibility: 'hidden',
                      boxShadow: isActive
                        ? '0 16px 48px rgba(0,0,0,0.7), 0 0 24px #d4a85340'
                        : '0 16px 48px rgba(0,0,0,0.7)',
                      opacity: isFlipped ? 1 : 0,
                      transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-90deg)',
                      transition: 'opacity 0.3s ease 0.08s, transform 0.32s ease 0.06s, box-shadow 0.3s',
                      animation: isFlipped && !fanned ? 'saju-flip 0.45s cubic-bezier(.16,1,.3,1) both' : 'none',
                    }}>
                      {/* 이미지 — 하단 마스크로 자연스럽게 페이드 */}
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
                      {/* 라벨 — 카드 하단 10% 위치 */}
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
                      {/* 활성 카드 shimmer */}
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
            <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.9rem', color: '#f0d48a', fontWeight: 700, marginBottom: '3px' }}>
              {travelCards[frontIdx].label}
            </p>
            <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.75rem', color: '#635c78' }}>
              {travelCards[frontIdx].mood}
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

          <button type="button" onClick={() => setFrontIdx(i => (i + 1) % TOTAL)} style={{
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
