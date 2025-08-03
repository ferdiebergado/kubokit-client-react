import ErrorFallback from '@/Error'
import { type ComponentType, StrictMode, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryRouter, Link, RouterProvider } from 'react-router'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

const originalConsoleError = console.error

beforeAll(() => {
    console.error = vi.fn()
})

afterAll(() => {
    console.error = originalConsoleError
})

interface TestCase {
    description: string
    Component: ComponentType
    loader?: () => Promise<void>
}

describe('Fallback component', () => {
    function ComponentWithRenderBug() {
        useEffect(() => {
            throw new Error('render error')
        }, [])

        return <h1>Buggy Component</h1>
    }

    function ComponentWithLoaderBug() {
        return <h1>Buggy Component</h1>
    }

    const testCases: TestCase[] = [
        {
            description: 'displays on rendering error',
            Component: ComponentWithRenderBug,
        },
        {
            description: 'displays on loader error',
            Component: ComponentWithLoaderBug,
            loader: async () => {
                await Promise.reject(new Error('failed to fetch data'))
            },
        },
    ]

    testCases.forEach(({ description, Component, loader }) => {
        it(description, async () => {
            function Home() {
                return <Link to="/buggy">Buggy Page</Link>
            }

            function BuggyPage() {
                return (
                    <>
                        <h1>Buggy Page</h1>
                        <Component />
                    </>
                )
            }

            const router = createMemoryRouter([
                {
                    path: '/',
                    ErrorBoundary: ErrorFallback,
                    children: [
                        {
                            index: true,
                            Component: Home,
                        },
                        {
                            path: '/buggy',
                            Component: BuggyPage,
                            loader,
                        },
                    ],
                },
            ])

            const queryClient = new QueryClient()

            const { getByText } = render(
                <StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </StrictMode>
            )

            await getByText('Buggy Page').click()
            await expect
                .element(getByText('Something went wrong.'))
                .toBeVisible()
        })
    })
})
