import { List, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../Badge/Badge'
import { ProcedureIcon, type ProcedureIconType } from './ProcedureIcon'

type BadgeColor = 'neutral' | 'green' | 'blue' | 'purple' | 'error'

export interface GuidedProcedureCardNewProps {
  illustrationType: ProcedureIconType
  title: string
  description: string
  badges?: { label: string; color: BadgeColor }[]
  stepCount: number
  estimatedMinutes?: number
  isHovered?: boolean
  onClick?: () => void
  className?: string
}

export function GuidedProcedureCardNew({
  illustrationType,
  title,
  description,
  badges = [],
  stepCount,
  estimatedMinutes,
  isHovered,
  onClick,
  className,
}: GuidedProcedureCardNewProps) {

  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex items-stretch border border-neutral-300 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.06)] overflow-hidden',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Illustration panel: 92px fixed, stretches with card height */}
      <div className="flex-none w-[92px] self-stretch bg-surface-sunken rounded-bl-xl rounded-tl-xl flex items-center justify-center">
        <ProcedureIcon type={illustrationType} className="w-[77px] h-[81px] flex-none" />
      </div>

      {/* Content panel */}
      <div
        className={cn(
          'flex-none w-[244px] flex flex-col gap-3 pt-5 pb-4 px-5 rounded-br-xl rounded-tr-xl transition-colors',
          isHovered ? 'bg-[#f4f8fb]' : 'bg-white group-hover:bg-[#f4f8fb]'
        )}
      >
        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {badges.map((b, i) => (
              <Badge key={i} label={b.label} color={b.color} size="sm" />
            ))}
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col gap-2">
          <p className="font-sans font-bold text-[14px] leading-[20px] text-foreground">{title}</p>
          <p className="font-body text-[14px] leading-[18px] text-muted">{description}</p>
        </div>

        {/* Footer stats */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-body text-[12.8px] text-muted whitespace-nowrap">
            <List size={14} strokeWidth={1.5} />
            {stepCount} steps
          </span>
          {estimatedMinutes != null && (
            <span className="flex items-center gap-1 font-body text-[12.8px] text-muted whitespace-nowrap">
              <Clock size={14} strokeWidth={1.5} />
              ~{estimatedMinutes} min
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
