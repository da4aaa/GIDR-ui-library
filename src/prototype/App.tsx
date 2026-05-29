import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Index } from './Index'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { OnboardingScreenStripe } from './screens/OnboardingScreenStripe'
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
        <Route path="/mobile-v0" element={<OnboardingScreen />} />
        <Route path="/mobile-v0-stripe" element={<OnboardingScreenStripe />} />
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
