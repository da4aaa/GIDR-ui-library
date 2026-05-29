import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './mobile.css'
import { OnboardingScreenAnthropicMobile } from './prototype/screens/OnboardingScreenAnthropic'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OnboardingScreenAnthropicMobile />
  </React.StrictMode>
)
