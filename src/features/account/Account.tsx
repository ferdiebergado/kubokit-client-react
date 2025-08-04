import { Outlet } from 'react-router'
import styles from './Account.module.css'

export default function Account() {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    )
}
