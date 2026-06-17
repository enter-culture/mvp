'use client'
import { cn } from '@/shared/lib/cn'

type ChipProps = {
  label: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
}

export function Chip({ label, selected, onClick, disabled = false }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled && !selected}
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1.5 text-sm font-sans border transition-all duration-200 cursor-pointer',
        selected
          ? 'bg-accent text-black border-accent chip-selected-glow'
          : 'bg-transparent text-white/80 border-white/30 hover:border-accent/60',
        disabled && !selected && 'opacity-30 cursor-not-allowed',
      )}
    >
      {label}
    </button>
  )
}
