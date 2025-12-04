import { createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import HomePage from '@/pages/Home/Home'
import OnboardingProfilePage from '@/pages/Onboarding/OnboardingProfile'
import OnboardingPreferencePage from '@/pages/Onboarding/OnboardingPreference'

export const router = createBrowserRouter([
  {
    path: RouterPath.HOME,
    element: <HomePage />,
  },
  {
    path: RouterPath.ONBOARDING_PROFILE,
    element: <OnboardingProfilePage />,
  },
  {
    path: RouterPath.ONBOARDING_PREFERENCE,
    element: <OnboardingPreferencePage />,
  },
])
