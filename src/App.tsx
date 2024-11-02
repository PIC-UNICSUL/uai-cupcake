import './global.css'

import { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { useStore } from '@/store'

import { router } from './routes'

export function App() {
  const { initializeUserFromStorage } = useStore()

  useEffect(() => {
    initializeUserFromStorage()
  }, [])

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | UAI Cupcake" />
      <RouterProvider router={router} />
      <Toaster richColors />
    </HelmetProvider>
  )
}
