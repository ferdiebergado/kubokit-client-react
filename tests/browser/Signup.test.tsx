import { QueryClient, QueryClientProvider } from 'react-query'
import { describe, beforeEach, vi, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import Signup from '@/features/account/signup'

beforeEach(() => {
    vi.restoreAllMocks()
})

describe('Signup component', () => {
    it('submits successfully and resets form', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => {
                const res = new Response(
                    JSON.stringify({ message: 'Registration successful' }),
                    {
                        status: 201,
                        headers: { 'Content-Type': 'application/json' },
                    }
                )

                return Promise.resolve(res)
            })
        )

        const queryClient = new QueryClient()

        const { getByLabelText, getByRole } = render(
            <QueryClientProvider client={queryClient}>
                <Signup />
            </QueryClientProvider>
        )

        const emailByLabel = getByLabelText(/email/i)
        const passwordByLabel = getByLabelText(/^password$/i)
        const passwordConfirmByLabel = getByLabelText(/confirm password/i)

        await emailByLabel.fill('test@example.com')
        await passwordByLabel.fill('password123')
        await passwordConfirmByLabel.fill('password123')
        await getByRole('button', { name: 'Submit' }).click()

        const alert = getByRole('alert')
        await expect.element(alert).toBeVisible()
        await expect.element(alert).toHaveClass('success')
        await expect
            .element(alert.getByText('Registration successful'))
            .toBeVisible()

        await Promise.all([
            expect(emailByLabel).toHaveValue(''),
            expect(passwordByLabel).toHaveValue(''),
            expect(passwordConfirmByLabel).toHaveValue(''),
        ])
    })

    it('shows validation errors from backend', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => {
                const res = new Response(
                    JSON.stringify({
                        message: 'Validation failed',
                        error: {
                            email: 'Invalid email',
                            password_confirm: 'Does not match',
                        },
                    }),
                    {
                        status: 422,
                        headers: { 'Content-Type': 'application/json' },
                    }
                )

                return Promise.resolve(res)
            })
        )

        const queryClient = new QueryClient()

        const { getByLabelText, getByRole, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <Signup />
            </QueryClientProvider>
        )

        const emailByLabel = getByLabelText(/email/i)
        const passwordByLabel = getByLabelText(/^password$/i)
        const passwordConfirmByLabel = getByLabelText(/confirm password/i)

        await emailByLabel.fill('test@example.com')
        await passwordByLabel.fill('password123')
        await passwordConfirmByLabel.fill('password123')
        await getByRole('button', { name: 'Submit' }).click()

        const alert = getByRole('alert')
        await expect.element(alert).toBeVisible()
        await expect.element(alert).toHaveClass('error')
        await expect.element(alert.getByText('Invalid input')).toBeVisible()

        await expect.element(emailByLabel).toHaveClass('error')
        await expect.element(getByText('Invalid email')).toBeInTheDocument()

        await expect.element(passwordConfirmByLabel).toHaveClass('error')
        await expect.element(getByText('Does not match')).toBeInTheDocument()
    })

    it('shows error when account already exists', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => {
                const res = new Response(
                    JSON.stringify({ message: 'User already exists' }),
                    {
                        status: 409,
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                return Promise.resolve(res)
            })
        )

        const queryClient = new QueryClient()

        const { getByLabelText, getByRole } = render(
            <QueryClientProvider client={queryClient}>
                <Signup />
            </QueryClientProvider>
        )

        const emailByLabel = getByLabelText(/email/i)
        const passwordByLabel = getByLabelText(/^password$/i)
        const passwordConfirmByLabel = getByLabelText(/confirm password/i)

        await emailByLabel.fill('test@example.com')
        await passwordByLabel.fill('password123')
        await passwordConfirmByLabel.fill('password123')
        await getByRole('button', { name: 'Submit' }).click()

        const alert = getByRole('alert')
        await expect.element(alert).toBeVisible()
        await expect.element(alert).toHaveClass('error')

        await expect
            .element(alert.getByText('User already exists'))
            .toBeVisible()
    })
})
