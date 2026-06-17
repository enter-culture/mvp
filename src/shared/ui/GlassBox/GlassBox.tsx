import { cn } from '@/shared/lib/cn'
import type { HTMLAttributes } from 'react'

type GlassBoxProps = HTMLAttributes<HTMLDivElement>

export function GlassBox({ className, children, ...props }: GlassBoxProps) {
  return (
    <div
      className={cn('backdrop-blur-md rounded-2xl', className)}
      style={{
        background: 'var(--color-glass)',
        border: '1px solid var(--color-glass-border)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
