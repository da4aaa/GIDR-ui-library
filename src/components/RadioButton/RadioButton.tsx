import { cn } from '@/lib/utils'

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function RadioButton({ label, disabled, checked, id, className, ...props }: RadioButtonProps) {
  const radioId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? Math.random().toString(36).slice(2)

  return (
    <label
      htmlFor={radioId}
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none font-body text-[14px] text-neutral-900',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <div className="relative size-4 shrink-0">
        <input
          type="radio"
          id={radioId}
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div className={cn(
          'size-4 rounded-full border flex items-center justify-center transition-colors',
          checked
            ? 'bg-accent-1-800 border-accent-1-800'
            : 'bg-white border-neutral-500 hover:border-neutral-700',
          className
        )}>
          {checked && <div className="size-[6px] rounded-full bg-white" />}
        </div>
      </div>
      {label && <span>{label}</span>}
    </label>
  )
}
