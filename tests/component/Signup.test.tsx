import Signup from '@/features/account/signup/Signup'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createRoutesStub } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'

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

        const Stub = createRoutesStub([
            {
                path: '/account/signin',
                Component: Signup,
            },
        ])

        const { getByLabelText, getByRole } = render(
            <QueryClientProvider client={queryClient}>
                <Stub initialEntries={['/account/signin']} />
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
        expect(alert).toHaveClass(/success/)
        expect(alert.getByText('Registration successful')).toBeVisible()

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

        const Stub = createRoutesStub([
            {
                path: '/account/signin',
                Component: Signup,
            },
        ])

        const { getByLabelText, getByRole, getByText } = render(
            <QueryClientProvider client={queryClient}>
                <Stub initialEntries={['/account/signin']} />
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
        expect(alert).toHaveClass(/error/)
        expect(alert.getByText('Invalid input')).toBeVisible()

        await expect.element(emailByLabel).toHaveClass(/error/)
        await expect.element(getByText('Invalid email')).toBeVisible()

        await expect.element(passwordConfirmByLabel).toHaveClass(/error/)
        await expect.element(getByText('Does not match')).toBeVisible()
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

        const Stub = createRoutesStub([
            {
                path: '/account/signin',
                Component: Signup,
            },
        ])

        const { getByLabelText, getByRole } = render(
            <QueryClientProvider client={queryClient}>
                <Stub initialEntries={['/account/signin']} />
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
        expect(alert).toHaveClass(/error/)

        expect(alert.getByText('User already exists')).toBeVisible()
    })
})
