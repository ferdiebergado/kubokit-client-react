import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './Home'
import { Layout, Signup } from './features/account'
import NotFound from './NotFound'
import ErrorFallback from './Error'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        ErrorBoundary: ErrorFallback,
        children: [
            {
                index: true,
                Component: Home,
            },
        ],
    },
    {
        path: '/account',
        Component: Layout,
        children: [
            {
                path: 'signup',
                Component: Signup,
            },
        ],
    },
    {
        path: '*',
        Component: NotFound,
    },
])
