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
    id: 'onboarding',
    name: 'Onboarding',
    description: 'App launch animation → login screen. Splash logo moves to login position.',
    status: 'in-progress',
    branch: 'proto/onboarding',
    createdAt: '2026-05-05',
  },
  {
    id: 'chat-screen',
    name: 'Chat Screen',
    description: 'Header, AI/user message thread, input bar. Core GIDR conversation flow.',
    status: 'in-progress',
    branch: 'proto/chat-screen',
    createdAt: '2026-04-30',
    missingComponents: ['ChatInputBar'],
  },
]
