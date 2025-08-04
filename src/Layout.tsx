import { Navbar } from '@/components'
import { Outlet } from 'react-router'
import './App.css'

function Layout() {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <section>
                    <Outlet />
                </section>
            </main>

            <footer>&copy; 2025 by ferdie bergado</footer>
        </>
    )
}

export default Layout
