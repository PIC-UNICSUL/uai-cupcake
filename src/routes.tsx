import { createBrowserRouter } from 'react-router-dom'

import { RequireAuth } from './pages/auth/RequireAuth'
import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Checkout } from './pages/app/checkout'
import { Contact } from './pages/app/contact'
import { Home } from './pages/app/home'
import { Orders } from './pages/app/orders'
import { Products } from './pages/app/products'
import { Profile } from './pages/app/profile'
import { ForgetPassword } from './pages/auth/forget-password'
import { NewPassword } from './pages/auth/new-password'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/orders',
        element: (
          <RequireAuth>
            <Orders />
          </RequireAuth>
        ),
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/profile',
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: '/checkout',
        element: (
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/forget-password',
        element: <ForgetPassword />,
      },
      {
        path: '/new-password',
        element: <NewPassword />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
    ],
  },
])
