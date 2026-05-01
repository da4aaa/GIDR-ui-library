import { Database } from 'lucide-react'
import { cn } from '@/lib/utils'

type SourceCardState = 'default' | 'hover' | 'active' | 'loading'

interface SourceCardProps {
  favicon?: string
  domain?: string
  title?: string
  url?: string
  state?: SourceCardState
  className?: string
}

export function SourceCard({ favicon, domain, title, url, state = 'default', className }: SourceCardProps) {
  if (state === 'loading') {
    return (
      <div className={cn('w-[280px] rounded-[10px] border border-neutral-300 bg-neutral-000 p-component-md flex flex-col gap-component-sm', className)}>
        <div className="h-[10px] rounded bg-neutral-200 w-3/4 animate-pulse" />
        <div className="h-[10px] rounded bg-neutral-200 w-full animate-pulse" />
        <div className="h-[10px] rounded bg-neutral-200 w-1/2 animate-pulse" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-[280px] rounded-[10px] border p-component-md flex flex-col gap-component-xs transition-colors',
        state === 'default' && 'bg-neutral-000 border-neutral-300',
        state === 'hover' && 'bg-white border-neutral-400',
        state === 'active' && 'bg-white border-[1.5px] border-[#1f95ff]',
        className
      )}
    >
      <div className="flex items-center gap-component-2xs">
        {favicon
          ? <img src={favicon} alt="" className="size-4 rounded-sm object-contain" />
          : <Database size={14} strokeWidth={1.5} className="text-neutral-600" />
        }
        {domain && <span className="text-caption font-body text-neutral-600">{domain}</span>}
      </div>
      {title && <p className="text-caption font-body font-semibold text-neutral-900 leading-[14px]">{title}</p>}
      {url && <p className="text-caption font-body text-neutral-600 truncate">{url}</p>}
    </div>
  )
}
