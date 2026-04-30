import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const inputVariants = cva(
  'flex items-center gap-2 w-full rounded-md border font-body text-[14px] transition-colors bg-white',
  {
    variants: {
      size: {
        sm: 'h-[30px] px-3 text-[13px]',
        md: 'h-[38px] px-3',
      },
      state: {
        default:  'border-neutral-500 text-neutral-900 placeholder:text-neutral-500 hover:border-neutral-700 focus-within:border-accent-1-800 focus-within:ring-2 focus-within:ring-accent-1-300',
        error:    'border-service-error-800 text-neutral-900 placeholder:text-neutral-500 focus-within:ring-2 focus-within:ring-service-error-300',
        disabled: 'border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed',
      },
    },
    defaultVariants: { size: 'md', state: 'default' },
  }
)

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  error?: string
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}

export function Input({
  label,
  helperText,
  error,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = 'md',
  state,
  className,
  disabled,
  id,
  ...props
}: InputProps) {
  const resolvedState = disabled ? 'disabled' : error ? 'error' : state ?? 'default'
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="font-body font-medium text-[13px] text-neutral-800 leading-[18px]">
          {label}
        </label>
      )}
      <div className={cn(inputVariants({ size, state: resolvedState }), className)}>
        {IconLeft && <IconLeft size={16} strokeWidth={1.5} className="shrink-0 text-neutral-500" />}
        <input
          id={inputId}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed"
          {...props}
        />
        {IconRight && <IconRight size={16} strokeWidth={1.5} className="shrink-0 text-neutral-500" />}
      </div>
      {(error || helperText) && (
        <p className={cn('text-[12px] leading-[16px] font-body', error ? 'text-service-error-800' : 'text-neutral-600')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}
