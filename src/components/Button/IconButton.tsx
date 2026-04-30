import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      size: {
        xs: 'size-4',
        s:  'size-6',
        m:  'size-8',
        l:  'size-10',
      },
      variant: {
        ghost:  'hover:bg-neutral-100 text-neutral-600',
        filled: 'bg-accent-1-800 text-white hover:bg-accent-1-900',
      },
    },
    defaultVariants: { size: 'm', variant: 'ghost' },
  }
)

const iconSize: Record<NonNullable<VariantProps<typeof iconButtonVariants>['size']>, number> = {
  xs: 10, s: 14, m: 18, l: 22,
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon
  label: string
}

export function IconButton({ icon: Icon, label, size = 'm', variant = 'ghost', className, ...props }: IconButtonProps) {
  return (
    <button aria-label={label} className={cn(iconButtonVariants({ size, variant }), className)} {...props}>
      <Icon size={iconSize[size ?? 'm']} strokeWidth={1.5} />
    </button>
  )
}
