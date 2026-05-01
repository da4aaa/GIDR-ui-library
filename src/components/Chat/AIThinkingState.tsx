import { cn } from '@/lib/utils'

interface AIThinkingStateProps {
  className?: string
}

export function AIThinkingState({ className }: AIThinkingStateProps) {
  return (
    <>
      <style>{`
        @keyframes thinking-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .thinking-dot { animation: thinking-dot 1s ease-in-out infinite; }
        .thinking-dot:nth-child(2) { animation-delay: 200ms; }
        .thinking-dot:nth-child(3) { animation-delay: 400ms; }
      `}</style>
      <div className={cn('flex items-center gap-component-sm', className)}>
        <div className="flex items-center gap-[4px]">
          <div className="thinking-dot size-[6px] rounded-full bg-neutral-500" />
          <div className="thinking-dot size-[6px] rounded-full bg-neutral-500" />
          <div className="thinking-dot size-[6px] rounded-full bg-neutral-500" />
        </div>
        <span className="text-body-semi font-body text-neutral-700">Thinking ...</span>
      </div>
    </>
  )
}
