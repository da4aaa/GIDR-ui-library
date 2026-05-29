import { type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DialogProps {
  title: string
  /** Content slot — height grows with children, no fixed size */
  children: ReactNode
  /** Action buttons rendered in the footer, right-aligned */
  actions?: ReactNode
  onClose?: () => void
  className?: string
}

export function Dialog({ title, children, actions, onClose, className }: DialogProps) {
  return (
    <div
      className={cn(
        'relative w-[600px] bg-surface-base rounded-sm shadow-elevation-4 flex flex-col overflow-hidden',
        className
      )}
    >
      {/* Title — pr-10 keeps text clear of the close button */}
      <div className="px-layout-lg py-layout-md pr-10">
        <p className="text-[20px] leading-[24px] font-semibold font-sans text-muted">
          {title}
        </p>
      </div>

      {/* Content slot — grows to fit whatever children are passed */}
      <div className="px-layout-lg py-layout-xs">
        {children}
      </div>

      {/* Actions slot */}
      {actions && (
        <div className="px-layout-lg pb-layout-md pt-layout-xs flex items-center justify-end gap-2">
          {actions}
        </div>
      )}

      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-[10px] right-[10px] w-5 h-5 flex items-center justify-center text-muted hover:text-foreground transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
