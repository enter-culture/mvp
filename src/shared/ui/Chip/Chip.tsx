'use client'
import { cn } from '@/shared/lib/cn'

type ChipProps = {
  label: string
  selected: boolean
  onClick: () => void
}

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-2 text-sm font-sans border transition-all duration-200 cursor-pointer',
        selected
          ? 'bg-accent text-black border-accent chip-selected-glow'
          : 'bg-transparent text-white/80 border-white/30 hover:border-accent/60',
      )}
    >
      {label}
    </button>
  )
}
