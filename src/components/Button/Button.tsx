import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 font-sans font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap',
  {
    variants: {
      variant: {
        primary:   'bg-accent-1-800 text-white hover:bg-accent-1-900 focus-visible:ring-accent-1-800',
        secondary: 'bg-transparent border-[1.5px] border-accent-1-900 text-accent-1-900 hover:bg-accent-1-100 focus-visible:ring-accent-1-800',
        chip:      'bg-transparent border-[1.5px] border-accent-1-900 text-accent-1-900 hover:bg-accent-1-100 rounded-full focus-visible:ring-accent-1-800',
      },
      size: {
        s: 'h-[30px] px-3 py-1.5 text-[13px] rounded-lg',
        m: 'h-9 px-4 py-2 text-[14px] rounded-xl',
        l: 'h-[38px] px-[22px] py-[9px] text-[14px] rounded-xl',
      },
    },
    compoundVariants: [
      { variant: 'chip', size: 's', class: 'h-[30px] px-3 py-1.5 text-[13px]' },
      { variant: 'chip', size: 'm', class: 'h-9 px-4 py-2 text-[14px]' },
    ],
    defaultVariants: { variant: 'primary', size: 'm' },
  }
)

const iconSizes: Record<NonNullable<VariantProps<typeof buttonVariants>['size']>, number> = {
  s: 14, m: 16, l: 18,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
}

export function Button({ variant = 'primary', size = 'm', iconLeft: IconLeft, iconRight: IconRight, children, className, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {IconLeft && <IconLeft size={iconSizes[size ?? 'm']} strokeWidth={1.5} />}
      {children}
      {IconRight && <IconRight size={iconSizes[size ?? 'm']} strokeWidth={1.5} />}
    </button>
  )
}
