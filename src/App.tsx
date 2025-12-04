import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@vapor-ui/core'
import { router } from '@/routes'
import '@vapor-ui/core/styles.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
