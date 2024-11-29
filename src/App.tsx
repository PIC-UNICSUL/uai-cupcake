import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { useStore } from '@/store'

import { queryClient } from './lib/react-query'
import { router } from './routes'
import { AuthProvider } from './contexts/auth-context'

export function App() {
  const { initializeUserFromStorage } = useStore()

  useEffect(() => {
    initializeUserFromStorage()
  }, [])

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | UAI Cupcake" />
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      </QueryClientProvider>
      <Toaster richColors duration={1500} position="top-right" />
    </HelmetProvider>
  )
}
