export type ProtoStatus = 'in-progress' | 'handed-off' | 'retired'

export interface Proto {
  id: string           // url slug: /proto/chat-screen
  name: string         // display name
  description: string  // one-liner on what the flow covers
  status: ProtoStatus
  branch: string
  createdAt: string    // ISO date
  handedOffAt?: string
  retiredAt?: string
  missingComponents?: string[]  // ProtoFlag items still open
}

export const PROTOTYPES: Proto[] = [
  {
    id: 'mobile-live',
    name: 'GIDR Mobile',
    description: 'Login → Choose GIDR → Jobs sheet → Landing → Guided Procedure → Procedure Summary',
    status: 'in-progress',
    branch: 'proto/guided-procedure',
    createdAt: '2026-05-28',
  },
]
