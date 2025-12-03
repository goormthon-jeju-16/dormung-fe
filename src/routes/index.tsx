import { createBrowserRouter } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import HomePage from '@/pages/Home/Home'

export const router = createBrowserRouter([
  {
    path: RouterPath.HOME,
    element: <HomePage />,
  },
])
