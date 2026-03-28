import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f7f1e8] text-stone-900">
      <header>
        <Navbar />
      </header>

      <main className="pb-16 pt-24">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
