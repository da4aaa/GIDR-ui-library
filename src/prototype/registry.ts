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
    id: 'mobile-v0',
    name: 'Mobile v.0',
    description: 'App launch animation → login screen. Splash logo moves to login position.',
    status: 'in-progress',
    branch: 'proto/onboarding',
    createdAt: '2026-05-05',
  },
  {
    id: 'mobile-v0-anthropic',
    name: 'Mobile v.0 — Anthropic',
    description: 'Same flow with Anthropic/Claude design: warm cream #FAF9F5, terracotta #C4553D CTA, coral left-border research cards.',
    status: 'in-progress',
    branch: 'proto/guided-procedure',
    createdAt: '2026-05-28',
  },
  {
    id: 'mobile-v0-stripe',
    name: 'Mobile v.0 — Stripe',
    description: 'Same flow as Mobile v.0 with Stripe design system applied (violet, mist surfaces, pill buttons).',
    status: 'in-progress',
    branch: 'proto/guided-procedure',
    createdAt: '2026-05-28',
  },
]
