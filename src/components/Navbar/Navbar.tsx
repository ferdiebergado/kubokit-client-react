import { NavLink } from 'react-router'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </nav>
    )
}
