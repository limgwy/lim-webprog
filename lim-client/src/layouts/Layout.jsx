import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text)]">
      <header>
        <Navbar />
      </header>

      <main className="pb-16 pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
