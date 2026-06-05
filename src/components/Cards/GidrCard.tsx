import { useState } from 'react'
import { FileText, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../Badge/Badge'

interface GidrCardProps {
  category: string
  title: string
  description: string
  procedureCount: number
  jobsInProgress: number
  isHovered?: boolean
  onClick?: () => void
  className?: string
}

export function GidrCard({ category, title, description, procedureCount, jobsInProgress, isHovered: forceHovered, onClick, className }: GidrCardProps) {
  const [hovered, setHovered] = useState(false)
  const isHovered = forceHovered ?? hovered

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative w-[335px] rounded-lg bg-surface-base cursor-pointer transition-all select-none',
        'pt-6 pb-4 px-6 flex flex-col gap-5',
        'active:scale-[0.98] active:shadow-none',
        isHovered ? 'shadow-elevation-2' : 'shadow-elevation-1',
        className
      )}
    >
      {/* gradient border outside — pseudo-element extends 2px beyond the card */}
      {isHovered && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-2px] rounded-[14px]"
          style={{ background: 'linear-gradient(135deg, #33CBCC, #B684F7)', zIndex: -1 }}
        />
      )}

      {/* content */}
      <div className="flex flex-col gap-3">
        <div className="w-fit">
          <Badge label={category} color={isHovered ? 'success' : 'neutral'} size="sm" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-body-bold font-sans text-foreground">{title}</p>
          <p className="text-body font-body text-muted">{description}</p>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-caption font-body text-muted">
          <FileText size={14} strokeWidth={1.5} />
          {procedureCount} procedures
        </span>
        <span className="flex items-center gap-1 text-caption font-body text-muted">
          <Wrench size={14} strokeWidth={1.5} />
          {jobsInProgress} jobs in progress
        </span>
      </div>
    </div>
  )
}
