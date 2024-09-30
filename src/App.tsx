import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './routes'
import { useStore } from '@/store'
import { useEffect } from 'react'

export function App() {
  const { initializeUserFromStorage } = useStore();

  useEffect(() => {
    initializeUserFromStorage();
  }, []);

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | UAI Cupcake" />
      <RouterProvider router={router} />
      <Toaster richColors />
    </HelmetProvider>
  )
}
