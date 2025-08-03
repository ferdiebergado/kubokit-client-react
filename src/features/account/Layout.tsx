import { Outlet } from 'react-router'
import styles from './Account.module.css'

export default function Layout() {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    )
}
