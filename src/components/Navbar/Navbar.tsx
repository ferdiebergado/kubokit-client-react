import { NavLink } from 'react-router'
import styles from './Navbar.module.css'

function getClass(isActive: boolean): string {
    let cls = styles['navbar-link']

    if (isActive) {
        cls += ' ' + styles.active
    }

    return cls
}

export default function Navbar() {
    return (
        <nav>
            <NavLink
                className={({ isActive }) => getClass(isActive)}
                to="/"
                end
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) => getClass(isActive)}
                to="/signup"
                end
            >
                Sign Up
            </NavLink>
        </nav>
    )
}
