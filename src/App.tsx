import './global.css'

import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { useStore } from '@/store'

import { router } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

export function App() {
  const { initializeUserFromStorage } = useStore()

  useEffect(() => {
    initializeUserFromStorage()
  }, [])

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | UAI Cupcake" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster richColors />
    </HelmetProvider>
  )
}
