import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router'
import Fallback from './Error'
import './index.css'
import { router } from './router'

const queryClient = new QueryClient()

const root = document.getElementById('root')
if (!root) {
    throw new Error('root element not defined')
}

createRoot(root).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={Fallback}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
)
