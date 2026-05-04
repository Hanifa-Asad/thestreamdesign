import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from '@components/ui/CustomCursor'
import PromoPopup from '@components/ui/PromoPopup'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="relative min-h-screen bg-dark-100 flex flex-col">
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom gaming cursor */}
      <CustomCursor />

      {/* Promotional popup shown once per 24 hours */}
      <PromoPopup />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
