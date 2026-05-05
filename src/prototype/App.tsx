import { HashRouter, Routes, Route } from 'react-router-dom'
import { Index } from './Index'
import { ChatScreen } from './screens/ChatScreen'
import { OnboardingScreen } from './screens/OnboardingScreen'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat-screen" element={<ChatScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
      </Routes>
    </HashRouter>
  )
}
