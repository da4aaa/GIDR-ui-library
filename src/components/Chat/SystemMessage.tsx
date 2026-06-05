import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, type BadgeColor } from '../Badge/Badge'

interface SystemMessageProps {
  title: string
  badge?: { label: string; color?: BadgeColor }
  showChevron?: boolean
  onClick?: () => void
  className?: string
}

export function SystemMessage({ title, badge, showChevron, onClick, className }: SystemMessageProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full rounded-md border border-neutral-400 p-component-md flex items-center gap-component-sm',
        onClick && 'cursor-pointer hover:bg-neutral-100 transition-colors',
        className
      )}
    >
      <span className="flex-1 text-caption-md font-body text-neutral-900">{title}</span>
      {badge && <Badge label={badge.label} color={badge.color ?? 'neutral'} size="sm" />}
      {showChevron && <ChevronRight size={20} strokeWidth={1.5} className="text-neutral-600 shrink-0" />}
    </div>
  )
}
