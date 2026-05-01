import { List, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../Badge/Badge'

interface GuidedProcedureCardProps {
  category: string
  title: string
  description: string
  stepCount: number
  estimatedMinutes: number
  isHovered?: boolean
  onClick?: () => void
  className?: string
}

export function GuidedProcedureCard({ category, title, description, stepCount, estimatedMinutes, isHovered, onClick, className }: GuidedProcedureCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-lg shadow-elevation-1 bg-white border border-neutral-300 p-component-lg flex flex-col gap-component-sm cursor-pointer transition-colors',
        isHovered && 'bg-accent-1-50 border-accent-1-800',
        className
      )}
    >
      <div className="flex flex-col gap-component-xs">
        <Badge label={category} color="neutral" size="sm" />
        <p className="text-body-bold font-sans text-neutral-900">{title}</p>
        <p className="text-body font-body text-neutral-700">{description}</p>
      </div>
      <div className="flex items-center gap-component-md pt-component-xs border-t border-neutral-200">
        <span className="flex items-center gap-component-2xs text-caption font-body text-neutral-700">
          <List size={14} strokeWidth={1.5} />
          {stepCount} steps
        </span>
        <span className="flex items-center gap-component-2xs text-caption font-body text-neutral-700">
          <Clock size={14} strokeWidth={1.5} />
          {estimatedMinutes} min
        </span>
      </div>
    </div>
  )
}
