import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@vapor-ui/core'
import { router } from '@/routes'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
