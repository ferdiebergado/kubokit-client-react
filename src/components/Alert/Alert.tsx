import './Alert.css'

interface AlertProps {
    msg: string
    cls?: 'success' | 'error'
}

export function Alert({ msg, cls = 'success' }: AlertProps) {
    return (
        <div className={`alert ${cls}`} role="alert">
            <p>{msg}</p>
        </div>
    )
}
