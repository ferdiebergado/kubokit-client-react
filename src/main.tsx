import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './router'

const queryClient = new QueryClient()

const root = document.getElementById('root')
if (!root) {
    throw new Error('root element not defined')
}

createRoot(root).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
)
