import styles from './Alert.module.css'

interface AlertProps {
    msg: string
    cls?: 'success' | 'error'
}

export function Alert({ msg, cls = 'success' }: AlertProps) {
    return (
        <div className={`${styles.alert} ${styles[cls]}`} role="alert">
            <p>{msg}</p>
        </div>
    )
}
