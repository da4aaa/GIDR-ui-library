import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 font-sans font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring disabled:pointer-events-none whitespace-nowrap',
  {
    variants: {
      variant: {
        filled: [
          'rounded-full bg-brand text-brand-foreground',
          'hover:bg-brand-hover',
          'disabled:bg-disabled disabled:text-disabled-foreground',
        ],
        stroked: [
          'rounded-full bg-transparent border-[1.5px] border-brand text-brand',
          'hover:bg-brand-subtle hover:border-brand-hover hover:text-brand-hover',
          'disabled:border-disabled disabled:text-disabled-foreground disabled:bg-transparent',
        ],
        ghost: [
          'rounded-full bg-[var(--color-ghost-default)] text-foreground',
          'hover:bg-[var(--color-ghost-default-hover)]',
          'disabled:bg-disabled disabled:text-disabled-foreground',
        ],
        link: [
          'bg-transparent text-[var(--color-link)] px-0',
          'hover:text-[var(--color-link-hover)] hover:underline underline-offset-2',
          'disabled:text-disabled-foreground',
        ],
      },
      size: {
        s: 'h-[30px] px-3 py-1.5 text-[13px]',
        m: 'h-9 px-4 py-2 text-[14px]',
        l: 'h-[38px] px-[22px] py-[9px] text-[14px]',
      },
      color: {
        default: '',
        error:   '',
        purple:  '',
      },
    },
    compoundVariants: [
      // link overrides size padding/height
      { variant: 'link', class: 'h-auto px-0 py-0' },

      // filled + error
      { variant: 'filled', color: 'error',  class: 'bg-destructive hover:bg-destructive-hover disabled:bg-disabled' },
      // filled + purple
      { variant: 'filled', color: 'purple', class: 'bg-[var(--color-purple-brand)] hover:bg-[var(--color-purple-brand-hover)] disabled:bg-disabled' },

      // stroked + error
      { variant: 'stroked', color: 'error',  class: 'border-destructive text-destructive hover:bg-destructive-subtle hover:border-destructive-hover hover:text-destructive-hover disabled:border-disabled disabled:text-disabled-foreground' },
      // stroked + purple
      { variant: 'stroked', color: 'purple', class: 'border-[var(--color-purple-brand)] text-[var(--color-purple-brand)] hover:bg-accent-3-100 hover:border-[var(--color-purple-brand-hover)] hover:text-[var(--color-purple-brand-hover)] disabled:border-disabled disabled:text-disabled-foreground' },

      // ghost + error
      { variant: 'ghost', color: 'error',  class: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover disabled:bg-disabled disabled:text-disabled-foreground' },
      // ghost + purple
      { variant: 'ghost', color: 'purple', class: 'bg-accent-3-400 text-foreground hover:bg-accent-3-500 disabled:bg-disabled' },

      // link + error
      { variant: 'link', color: 'error',  class: 'text-destructive hover:text-destructive-hover disabled:text-disabled-foreground' },
      // link + purple
      { variant: 'link', color: 'purple', class: 'text-accent-3-vivid hover:text-accent-3-800 disabled:text-disabled-foreground' },
    ],
    defaultVariants: { variant: 'filled', size: 'm', color: 'default' },
  }
)

const iconSizes: Record<NonNullable<VariantProps<typeof buttonVariants>['size']>, number> = {
  s: 14, m: 16, l: 18,
}

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof buttonVariants> {
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}

export function Button({ variant = 'filled', size = 'm', color = 'default', iconLeft: IconLeft, iconRight: IconRight, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, color }), className)} {...props}>
      {IconLeft && <IconLeft size={iconSizes[size ?? 'm']} strokeWidth={1.5} />}
      {children}
      {IconRight && <IconRight size={iconSizes[size ?? 'm']} strokeWidth={1.5} />}
    </button>
  )
}
