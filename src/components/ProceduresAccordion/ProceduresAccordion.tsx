import { type ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const GidrLogo = () => (
  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="7.5" stroke="#33CBCC" strokeWidth="1.5"/>
    <circle cx="18" cy="9" r="7.5" stroke="#33CBCC" strokeWidth="1.5"/>
    <circle cx="13.5" cy="18" r="7.5" stroke="#33CBCC" strokeWidth="1.5"/>
  </svg>
)

interface ProceduresAccordionProps {
  count: number
  isExpanded?: boolean
  onToggle?: () => void
  children?: ReactNode
  className?: string
}

export function ProceduresAccordion({ count, isExpanded, onToggle, children, className }: ProceduresAccordionProps) {
  return (
    <div className={cn('rounded-lg shadow-elevation-1 bg-neutral-000 px-component-lg py-component-md', className)}>
      <div
        className="flex items-center gap-component-sm cursor-pointer h-[26px]"
        onClick={onToggle}
      >
        <GidrLogo />
        <span className="flex-1 text-body-bold font-sans text-neutral-900">{count} procedures available</span>
        {isExpanded
          ? <ChevronUp size={24} strokeWidth={1.5} className="text-neutral-700 shrink-0" />
          : <ChevronDown size={24} strokeWidth={1.5} className="text-neutral-700 shrink-0" />
        }
      </div>
      {isExpanded && children && (
        <div className="mt-component-md">{children}</div>
      )}
    </div>
  )
}
