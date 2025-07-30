import './Alert.css'

type AlertProps = {
    msg: string
    cls?: 'success' | 'error'
}

export function Alert({ msg, cls = 'success' }: AlertProps) {
    return (
        <div className={`alert ${cls}`}>
            <p>{msg}</p>
        </div>
    )
}
