import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Index } from './Index'
import { OnboardingScreenAnthropic, OnboardingScreenAnthropicMobile } from './screens/OnboardingScreenAnthropic'
import { ProtoDrawer } from './components/ProtoDrawer'

function AppInner() {
  const { pathname } = useLocation()
  const isMobile = pathname === '/mobile-live'
  return (
    <>
      {!isMobile && <ProtoDrawer />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mobile-v0-anthropic" element={<OnboardingScreenAnthropic />} />
        <Route path="/mobile-live" element={<OnboardingScreenAnthropicMobile />} />
      </Routes>
    </>
  )
}

export function App() {
  return (
    <HashRouter>
      <AppInner />
    </HashRouter>
  )
}
