import { createBrowserRouter } from 'react-router'
import App from './App'
import ErrorFallback from './Error'
import { Layout, Signup } from './features/account'
import Home from './Home'
import NotFound from './NotFound'

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
            {
                path: 'account',
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
        ],
    },
])
