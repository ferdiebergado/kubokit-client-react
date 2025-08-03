import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './Home'
import { Layout, Signup } from './features/account'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
        ],
    },
    {
        path: '/accounts',
        Component: Layout,
        children: [
            {
                path: 'signup',
                Component: Signup,
            },
        ],
    },
])
