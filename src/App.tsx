import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router'
import { router } from './router'

const queryClient = new QueryClient()

export default function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>
    )
}
