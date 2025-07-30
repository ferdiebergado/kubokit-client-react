import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useMutation } from 'react-query'
import { Alert } from '../../components/Alert/Alert'
import { ValidationError } from '../../lib/errors'
import type { APIResponse } from '../../types'
import './Register.css'

type FormData = {
    email: string
    password: string
    password_confirm: string
}

type FormErrors = Partial<FormData>

async function registerUser(formData: FormData): Promise<string> {
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

    const { message, error }: APIResponse<undefined, FormErrors> =
        await res.json()

    if (!res.ok) {
        if (res.status === 422) {
            throw new ValidationError(error!)
        }
        throw new Error(message)
    }

    return Promise.resolve(message)
}

export default function Register() {
    const initialData: FormData = {
        email: '',
        password: '',
        password_confirm: '',
    }

    const [formData, setFormData] = useState(initialData)

    const { mutate, error, isError, isLoading, data, isSuccess } = useMutation<
        unknown,
        Error,
        FormData
    >({
        mutationFn: (formData: FormData) => {
            return registerUser(formData)
        },
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target
        setFormData((values) => ({ ...values, [name]: value }))
    }

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault()

        mutate(formData, {
            onSuccess: () => {
                setFormData(initialData)
            },
        })
    }

    return (
        <div className="wrapper">
            {isSuccess && <Alert msg={data as string} />}
            {isError && <Alert msg={error.message} cls="error" />}

            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={
                            isError &&
                            (error as ValidationError<FormErrors>).details.email
                                ? 'error'
                                : ''
                        }
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        autoComplete="email"
                    />
                    {isError &&
                        (error as ValidationError<FormErrors>).details
                            .email && (
                            <p className="help-text">
                                {
                                    (error as ValidationError<FormErrors>)
                                        .details.email
                                }
                            </p>
                        )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={
                            isError &&
                            (error as ValidationError<FormErrors>).details
                                .password
                                ? 'error'
                                : ''
                        }
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    {isError &&
                        (error as ValidationError<FormErrors>).details
                            .password && (
                            <p className="help-text">
                                {
                                    (error as ValidationError<FormErrors>)
                                        .details.password
                                }
                            </p>
                        )}
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm password</label>
                    <input
                        type="password"
                        name="password_confirm"
                        id="password_confirm"
                        className={
                            isError &&
                            (error as ValidationError<FormErrors>).details
                                .password_confirm
                                ? 'error'
                                : ''
                        }
                        value={formData.password_confirm}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                    />
                    {isError &&
                        (error as ValidationError<FormErrors>).details
                            .password_confirm && (
                            <p className="help-text">
                                {
                                    (error as ValidationError<FormErrors>)
                                        .details.password_confirm
                                }
                            </p>
                        )}
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}
