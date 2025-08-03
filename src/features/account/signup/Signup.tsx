import { Alert } from '@/components'
import { HTTPError, ValidationError } from '@/lib/errors'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useMutation } from 'react-query'
import type { APIResponse } from '../../../types'
import styles from './Signup.module.css'

interface FormData extends Record<string, string> {
    email: string
    password: string
    password_confirm: string
}

type FormErrors = Partial<FormData>

async function signupUser(formData: FormData): Promise<string> {
    try {
        const { email, password, password_confirm } = formData
        const res = await fetch('http://localhost:8888/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                password_confirm,
            }),
        })

        const { message, error } = (await res.json()) as APIResponse<
            undefined,
            FormErrors
        >

        if (!res.ok) {
            if (res.status === 422 && error) {
                throw new ValidationError(error)
            }

            throw new HTTPError(message, res.status)
        }

        return await Promise.resolve(message)
    } catch (error) {
        console.error(error)

        if (error instanceof ValidationError) {
            throw error
        }

        if (error instanceof HTTPError && error.code < 500) {
            throw new Error(error.message)
        }

        throw new Error('An unexpected error occurred.')
    }
}

export default function Signup() {
    const initialData: FormData = {
        email: '',
        password: '',
        password_confirm: '',
    }

    const [formData, setFormData] = useState(initialData)

    const { mutate, error, isError, isLoading, data, isSuccess } = useMutation<
        Awaited<ReturnType<typeof signupUser>>,
        Error,
        FormData
    >({
        mutationFn: (formData: FormData) => {
            return signupUser(formData)
        },
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target
        setFormData(values => ({ ...values, [name]: value }))
    }

    function handleSubmit(e: FormEvent): void {
        e.preventDefault()

        mutate(formData, {
            onSuccess: () => {
                setFormData(initialData)
            },
        })
    }

    function isFormValidationError(
        err: unknown
    ): err is ValidationError<FormErrors> {
        return (
            err instanceof ValidationError &&
            typeof err.details === 'object' &&
            err.details !== undefined
        )
    }

    function hasError(field: string): boolean {
        if (isError && isFormValidationError(error)) {
            return !!error.details[field]
        }
        return false
    }

    function getError(field: string): string | undefined {
        if (isError && isFormValidationError(error)) {
            return error.details[field]
        }
    }

    return (
        <div className={styles['form-wrapper']}>
            {isSuccess && <Alert msg={data} />}
            {isError && <Alert msg={error.message} cls="error" />}

            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} method="POST">
                <div
                    className={`${styles['form-group']} ${hasError('email') ? styles.error : ''}`}
                >
                    <label htmlFor="email" className={styles['form-label']}>
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={`${styles['form-input']} ${hasError('email') ? styles.error : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        autoComplete="email"
                    />
                    {hasError('email') && (
                        <p className="help-text">{getError('email')}</p>
                    )}
                </div>
                <div
                    className={`${styles['form-group']} ${hasError('password') ? styles.error : ''}`}
                >
                    <label htmlFor="password" className={styles['form-label']}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={`${styles['form-input']} ${hasError('password') ? styles.error : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    {hasError('password') && (
                        <p className="help-text">{getError('password')}</p>
                    )}
                </div>
                <div
                    className={`${styles['form-group']} ${hasError('password_confirm') ? styles.error : ''}`}
                >
                    <label
                        htmlFor="password_confirm"
                        className={styles['form-label']}
                    >
                        Confirm password
                    </label>
                    <input
                        type="password"
                        name="password_confirm"
                        id="password_confirm"
                        className={`${styles['form-input']} ${hasError('password_confirm') ? styles.error : ''}`}
                        value={formData.password_confirm}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                    />
                    {hasError('password_confirm') && (
                        <p className="help-text">
                            {getError('password_confirm')}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    role="button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}
