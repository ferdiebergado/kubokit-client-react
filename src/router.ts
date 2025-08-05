import { createBrowserRouter } from 'react-router'
import ErrorFallback from './Error'
import Account from './features/account/Account'
import Signup from './features/account/signup/Signup'
import Home from './Home'
import Layout from './Layout'
import NotFound from './NotFound'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        ErrorBoundary: ErrorFallback,
        children: [
            {
                index: true,
                Component: Home,
            },
        ],
    },
    {
        path: 'account',
        Component: Account,
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
