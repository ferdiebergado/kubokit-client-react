import { createBrowserRouter } from 'react-router'
import App from './App'
import Home from './Home'
import Signup from './features/account/signup'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/accounts',
                children: [
                    {
                        path: 'signup',
                        Component: Signup,
                    },
                ],
            },
        ],
    },
])
