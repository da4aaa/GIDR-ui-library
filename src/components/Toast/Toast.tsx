import { cva, type VariantProps } from 'class-variance-authority'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'flex items-start gap-3 w-full max-w-sm rounded-lg border shadow-elevation-2 px-4 py-3 font-body',
  {
    variants: {
      type: {
        success: 'bg-white border-service-success-300',
        error:   'bg-white border-service-error-300',
        warning: 'bg-white border-service-warning-300',
        info:    'bg-white border-accent-2-200',
      },
    },
    defaultVariants: { type: 'info' },
  }
)

const icons = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
}

const iconColors = {
  success: 'text-service-success-800',
  error:   'text-service-error-800',
  warning: 'text-service-warning-800',
  info:    'text-accent-2-700',
}

interface ToastProps extends VariantProps<typeof toastVariants> {
  title: string
  message?: string
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
  className?: string
}

export function Toast({ type = 'info', title, message, action, onDismiss, className }: ToastProps) {
  const Icon = icons[type ?? 'info']

  return (
    <div role="alert" className={cn(toastVariants({ type }), className)}>
      <Icon size={18} strokeWidth={1.5} className={cn('shrink-0 mt-0.5', iconColors[type ?? 'info'])} />
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-[14px] text-neutral-900 leading-[20px]">{title}</p>
        {message && <p className="text-[13px] text-neutral-600 leading-[18px] mt-0.5">{message}</p>}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-2 text-[13px] font-medium text-accent-1-800 hover:underline underline-offset-2"
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
