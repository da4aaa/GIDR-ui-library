import { useState } from 'react'
import { List, Timer, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../Badge/Badge'
import type { BadgeColor } from '../Badge/Badge'

export interface ProcedureCardProps {
  icon?: LucideIcon
  title: string
  description: string
  stepCount: number
  runCount?: number
  badge?: { label: string; color: BadgeColor }
  isHovered?: boolean
  onClick?: () => void
  className?: string
}

export function ProcedureCard({
  icon: Icon,
  title,
  description,
  stepCount,
  runCount,
  badge,
  isHovered: forceHovered,
  onClick,
  className,
}: ProcedureCardProps) {
  const [hovered, setHovered] = useState(false)
  const isHovered = forceHovered ?? hovered

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative w-[335px] rounded-lg bg-surface-base cursor-pointer transition-all select-none',
        'pt-5 pb-4 px-5 flex flex-col gap-3',
        'active:scale-[0.98] active:shadow-none',
        'border-2',
        isHovered
          ? 'border-transparent shadow-elevation-2'
          : 'border-border shadow-[0px_2px_4px_rgba(0,0,0,0.06)]',
        className
      )}
    >
      {/* gradient ring outside on hover */}
      {isHovered && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-4px] rounded-[16px]"
          style={{ background: 'linear-gradient(135deg, #33CBCC, #B684F7)', zIndex: -1 }}
        />
      )}

      {/* content row */}
      <div className="flex gap-3 items-start">
        <div className="shrink-0 bg-surface-page p-2 rounded-lg flex items-center justify-center">
          {Icon
            ? <Icon size={32} strokeWidth={1.5} className="text-accent-3-800" />
            : <div className="size-8 rounded bg-neutral-200" />
          }
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-body-bold font-sans text-foreground">{title}</p>
          <p className="text-body font-body text-neutral-600">{description}</p>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-border" />

      {/* footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-body text-[12.8px] text-muted whitespace-nowrap">
            <List size={14} strokeWidth={1.5} />
            {stepCount} steps
          </span>
          {runCount != null && (
            <span className="flex items-center gap-1 font-body text-[12.8px] text-muted whitespace-nowrap">
              <Timer size={14} strokeWidth={1.5} />
              {runCount} runs
            </span>
          )}
        </div>
        {badge && (
          <Badge label={badge.label} color={badge.color} size="sm" />
        )}
      </div>
    </div>
  )
}
