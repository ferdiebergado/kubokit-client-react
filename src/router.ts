import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './Home'
import Signup from './features/account/signup'
import Layout from './features/account/Layout'

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
