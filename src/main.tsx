import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

const root = document.getElementById('root')
if (!root) {
    throw new Error('root element not defined')
}

createRoot(root).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
)
