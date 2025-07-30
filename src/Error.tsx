import { useErrorBoundary } from 'react-error-boundary'

export default function Fallback() {
    const { resetBoundary } = useErrorBoundary()

    return (
        <div className="error-wrapper">
            <h1>Something went wrong.</h1>
            <button onClick={resetBoundary}>Try again</button>
        </div>
    )
}
