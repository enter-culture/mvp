'use client'
import { useState } from 'react'
import { travelCards } from '@/entities/travel-card/data/travel-cards'
import type { TravelCard } from '@/entities/travel-card/model/types'

type CardFanProps = {
  onSelect: (card: TravelCard) => void
}

const CARD_SLOTS = [
  { transform: 'translateY(-20px)', zIndex: 7, opacity: 1 },
  { transform: 'translateX(64px) scale(0.88) rotate(8deg)', zIndex: 6, opacity: 1 },
  { transform: 'translateX(128px) scale(0.76) rotate(16deg)', zIndex: 5, opacity: 1 },
  { transform: 'translateX(192px) scale(0.64) rotate(24deg)', zIndex: 4, opacity: 0.4 },
  { transform: 'translateX(-64px) scale(0.88) rotate(-8deg)', zIndex: 6, opacity: 1 },
  { transform: 'translateX(-128px) scale(0.76) rotate(-16deg)', zIndex: 5, opacity: 1 },
  { transform: 'translateX(-192px) scale(0.64) rotate(-24deg)', zIndex: 4, opacity: 0.4 },
]

export function CardFan({ onSelect }: CardFanProps) {
  const [hoveredIdx, setHoveredIdx] = useState(0)
  const [selected, setSelected] = useState<TravelCard | null>(null)

  function handleSelect() {
    const card = travelCards[hoveredIdx]
    setSelected(card)
    setTimeout(() => onSelect(card), 400)
  }

  // Reorder cards so hovered card is first (front)
  const orderedIndices = [
    hoveredIdx,
    ...travelCards.map((_, i) => i).filter(i => i !== hoveredIdx),
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Fan */}
      <div
        style={{
          position: 'relative',
          width: '120px',
          height: '200px',
          margin: '0 auto',
        }}
      >
        {orderedIndices.map((cardIdx, slotIdx) => {
          const card = travelCards[cardIdx]
          const slot = CARD_SLOTS[slotIdx] ?? CARD_SLOTS[CARD_SLOTS.length - 1]
          const isHovered = slotIdx === 0

          return (
            <div
              key={card.id}
              onClick={() => {
                if (slotIdx === 0) {
                  handleSelect()
                } else {
                  setHoveredIdx(cardIdx)
                }
              }}
              style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '120px',
                height: '176px',
                transform: slot.transform,
                zIndex: slot.zIndex,
                opacity: selected && !isHovered ? 0.3 : slot.opacity,
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(.16,1,.3,1), opacity 0.3s',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: isHovered ? '2px solid #d4a853' : '2px solid transparent',
                  boxShadow: isHovered ? '0 0 20px #d4a85360' : '0 4px 12px rgba(0,0,0,0.5)',
                  transition: 'border 0.3s, box-shadow 0.3s',
                }}
              >
                <img
                  src={card.image}
                  alt={card.label}
                  draggable={false}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    background: '#0f0e1a',
                    padding: '6px 4px',
                    textAlign: 'center',
                    fontFamily: '"Noto Serif KR", serif',
                    fontSize: '0.7rem',
                    color: isHovered ? '#f0d48a' : '#a8a0be',
                    transition: 'color 0.3s',
                  }}
                >
                  {card.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected card info + button */}
      <div style={{ textAlign: 'center', minHeight: '80px' }}>
        <p style={{ fontFamily: '"Noto Serif KR", serif', fontSize: '0.875rem', color: '#f0d48a', marginBottom: '4px' }}>
          {travelCards[hoveredIdx].label}
        </p>
        <p style={{ fontFamily: '"Pretendard Variable", sans-serif', fontSize: '0.75rem', color: '#635c78', marginBottom: '1rem' }}>
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
          }}
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
          }}
        >
          다른 카드 보기
        </button>
      </div>
    </div>
  )
}
