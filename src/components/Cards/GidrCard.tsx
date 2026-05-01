import { List, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../Badge/Badge'

interface GidrCardProps {
  category: string
  title: string
  description: string
  procedureCount: number
  lastAccessed: string
  isHovered?: boolean
  onClick?: () => void
  className?: string
}

export function GidrCard({ category, title, description, procedureCount, lastAccessed, isHovered, onClick, className }: GidrCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-[335px] rounded-lg shadow-elevation-1 p-component-lg flex flex-col gap-component-sm cursor-pointer transition-all',
        isHovered
          ? 'shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]'
          : 'bg-white border border-transparent',
        className
      )}
      style={isHovered ? {
        background: 'linear-gradient(#E8F7F7, #E8F7F7) padding-box, linear-gradient(135deg, #33CBCC, #B684F7) border-box',
        border: '2px solid transparent',
      } : undefined}
    >
      <div className="flex flex-col gap-component-xs">
        <div className="w-fit">
          <Badge label={category} color={isHovered ? 'green' : 'neutral'} size="sm" />
        </div>
        <p className="text-body-bold font-sans text-neutral-900">{title}</p>
        <p className="text-body font-body text-neutral-700">{description}</p>
      </div>
      <div className="flex items-center gap-component-md pt-component-xs border-t border-neutral-200">
        <span className="flex items-center gap-component-2xs text-caption font-body text-neutral-700">
          <List size={14} strokeWidth={1.5} />
          {procedureCount} procedures
        </span>
        <span className="flex items-center gap-component-2xs text-caption font-body text-neutral-700">
          <Clock size={14} strokeWidth={1.5} />
          {lastAccessed}
        </span>
      </div>
    </div>
  )
}
