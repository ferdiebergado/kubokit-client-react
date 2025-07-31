import { Navbar } from '@components'
import { Outlet } from 'react-router'
import './App.css'

function App() {
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

            <footer>&copy; Copyright 2025 - present.</footer>
        </>
    )
}

export default App
