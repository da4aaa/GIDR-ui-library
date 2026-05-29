import { cn } from '@/lib/utils'

export type ProcedureIconType =
  | 'Network' | 'Safety' | 'Electrical'
  | 'Documentation' | 'Gas' | 'HVAC' | 'Diagnostics'
  | 'Mechanical' | 'Plumbing' | 'Maintenance' | 'Installation' | 'Calibration'

const ASSETS: Record<ProcedureIconType, string> = {
  Network:       '/icons/ico-1.png',
  Safety:        '/icons/ico-3.png',
  Electrical:    '/icons/ico-2.png',
  Documentation: 'https://www.figma.com/api/mcp/asset/48d4f3cd-3524-49a7-bf2f-91eb39207a3a',
  Gas:           'https://www.figma.com/api/mcp/asset/2f7456fd-60e5-4296-8693-7923060beaa3',
  HVAC:          'https://www.figma.com/api/mcp/asset/de5dd4ca-ee2e-4635-b40b-483fbacd737d',
  Diagnostics:   'https://www.figma.com/api/mcp/asset/33ab4792-3cd5-4800-8735-c550c9dbfb69',
  Mechanical:    'https://www.figma.com/api/mcp/asset/a704bea0-4e9e-42ad-b981-1babe52565e6',
  Plumbing:      'https://www.figma.com/api/mcp/asset/f27bcd6d-fd37-41f6-b9d1-97a0a3525352',
  Maintenance:   'https://www.figma.com/api/mcp/asset/2c1a5c71-18be-4a7e-a6bd-fff332766ffd',
  Installation:  'https://www.figma.com/api/mcp/asset/35085978-824e-4456-b82b-096d2e1fa2f1',
  Calibration:   'https://www.figma.com/api/mcp/asset/9c565943-4c95-4320-a09b-50da26cf1216',
}

interface ProcedureIconProps {
  type: ProcedureIconType
  className?: string
}

export function ProcedureIcon({ type, className }: ProcedureIconProps) {
  return (
    <img
      src={ASSETS[type]}
      alt={type}
      className={cn('object-cover', className)}
    />
  )
}
