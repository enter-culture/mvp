import { cn } from '@/shared/lib/cn'

type ProgressBarProps = {
  current: number
  total: number
  className?: string
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const pct = (current / total) * 100
  return (
    <div className={cn('w-full', className)}>
      <p className="text-xs text-white/40 mb-2 font-sans">
        {current} / {total}
      </p>
      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
