import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App'
import Fallback from './Error'
import './index.css'
import Home from './pages/Home'
import Register from './pages/register'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={Fallback}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Home />}></Route>
                            <Route path="register" element={<Register />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
)
