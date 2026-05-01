import { type ReactNode } from 'react'
import { Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIMessageProps {
  children: ReactNode
  sourcesCount?: number
  onCopy?: () => void
  onThumbsUp?: () => void
  onThumbsDown?: () => void
  onSourcesClick?: () => void
  className?: string
}

export function AIMessage({ children, sourcesCount, onCopy, onThumbsUp, onThumbsDown, onSourcesClick, className }: AIMessageProps) {
  return (
    <div className={cn('flex flex-col gap-component-sm', className)}>
      <div className="text-body font-sans text-neutral-900">{children}</div>
      <div className="flex items-center gap-component-xs">
        <button onClick={onCopy} className="p-1 rounded hover:bg-neutral-100 transition-colors text-neutral-600">
          <Copy size={16} strokeWidth={1.5} />
        </button>
        <button onClick={onThumbsUp} className="p-1 rounded hover:bg-neutral-100 transition-colors text-neutral-600">
          <ThumbsUp size={16} strokeWidth={1.5} />
        </button>
        <button onClick={onThumbsDown} className="p-1 rounded hover:bg-neutral-100 transition-colors text-neutral-600">
          <ThumbsDown size={16} strokeWidth={1.5} />
        </button>
        {sourcesCount != null && (
          <button
            onClick={onSourcesClick}
            className="text-caption font-body font-semibold text-[#1f95ff] hover:underline ml-1"
          >
            {sourcesCount} sources
          </button>
        )}
      </div>
    </div>
  )
}
