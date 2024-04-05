import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Checkout } from './pages/app/checkout/checkout'
import { Home } from './pages/app/home/home'
import { Orders } from './pages/app/orders/orders'
import { Products } from './pages/app/products/products'
import { Profile } from './pages/app/profile/profile'
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
        element: <Orders />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
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
    ],
  },
])
