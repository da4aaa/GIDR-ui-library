import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  indeterminate?: boolean
}

export function Checkbox({ label, indeterminate = false, disabled, className, checked, id, ...props }: CheckboxProps) {
  const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? Math.random().toString(36).slice(2)
  const isChecked = checked || indeterminate

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none font-body text-[14px] text-neutral-900',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <div className="relative size-4 shrink-0">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div className={cn(
          'size-4 rounded-sm border flex items-center justify-center transition-colors',
          isChecked
            ? 'bg-accent-1-800 border-accent-1-800'
            : 'bg-white border-neutral-500 hover:border-neutral-700'
        )}>
          {indeterminate
            ? <Minus size={10} strokeWidth={3} className="text-white" />
            : checked && <Check size={10} strokeWidth={3} className="text-white" />
          }
        </div>
      </div>
      {label && <span className={cn(disabled && 'text-neutral-500')}>{label}</span>}
    </label>
  )
}
