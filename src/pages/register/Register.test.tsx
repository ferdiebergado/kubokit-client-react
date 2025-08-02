import { QueryClient, QueryClientProvider } from 'react-query'
import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import Register from './Register'

it('loads and displays heading', async () => {
    const client = new QueryClient()

    const screen = render(
        <QueryClientProvider client={client}>
            <Register />
        </QueryClientProvider>
    )

    const heading = screen.getByRole('heading')

    await expect.element(heading).toHaveTextContent('Register')
})
