import { createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import HomePage from '@/pages/Home/Home'
import OnboardingProfilePage from '@/pages/Onboarding/OnboardingProfile'
import OnboardingPreferencePage from '@/pages/Onboarding/OnboardingPreference'
import LoadingPage from '@/pages/Meeting/LoadingPage'
import RecommendPage from '@/pages/Meeting/RecommendPage'
import BoardPage from '@/pages/Board/Board'
import BoardWritePage from '@/pages/Board/BoardWrite'
import BoardPostDetailPage from '@/pages/Board/BoardPostDetail'
import MatchingSuccessPage from '@/pages/Meeting/MatchingSuccessPage'
import MainPage from '@/pages/Main/MainPage'

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
  {
    path: RouterPath.LOADING,
    element: <LoadingPage />,
  },
  {
    path: RouterPath.RECOMMEND,
    element: <RecommendPage />,
  },
  {
    path: RouterPath.BOARD,
    element: <BoardPage />,
  },
  {
    path: RouterPath.BOARD_WRITE,
    element: <BoardWritePage />,
  },
  {
    path: RouterPath.BOARD_POST_DETAIL,
    element: <BoardPostDetailPage />,
    path: RouterPath.MATCHING_SUCCESS,
    element: <MatchingSuccessPage />,
  },
  {
    path: RouterPath.MAIN,
    element: <MainPage />,
  },
])
