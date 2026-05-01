import { cn } from '@/lib/utils'

interface Attachment {
  src: string
  alt?: string
}

interface UserMessageProps {
  message?: string
  attachments?: Attachment[]
  type?: 'text' | 'attachment'
  className?: string
}

export function UserMessage({ message, attachments, type = 'text', className }: UserMessageProps) {
  if (type === 'attachment' && attachments?.length) {
    return (
      <div className="flex justify-end">
        <img
          src={attachments[0].src}
          alt={attachments[0].alt ?? ''}
          className="size-[50px] rounded-[6px] object-cover"
        />
      </div>
    )
  }

  return (
    <div className="flex justify-end">
      <div className={cn(
        'max-w-[80%] bg-neutral-000 border border-neutral-400 rounded-md rounded-tr-none shadow-elevation-1 px-3 py-3',
        className
      )}>
        {attachments?.length ? (
          <div className="flex flex-wrap gap-component-xs mb-component-xs">
            {attachments.map((a, i) => (
              <img key={i} src={a.src} alt={a.alt ?? ''} className="size-[50px] rounded-[6px] object-cover" />
            ))}
          </div>
        ) : null}
        {message && <p className="text-body font-body text-neutral-900">{message}</p>}
      </div>
    </div>
  )
}
