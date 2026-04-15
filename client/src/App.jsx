import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '@components/layout/Layout'

// Pages — lazy loaded for performance
import { lazy, Suspense } from 'react'
const Home        = lazy(() => import('@pages/Home'))
const About       = lazy(() => import('@pages/About'))
const Services    = lazy(() => import('@pages/Services'))
const ServiceDetail = lazy(() => import('@pages/ServiceDetail'))
const Pricing     = lazy(() => import('@pages/Pricing'))
const Portfolio   = lazy(() => import('@pages/Portfolio'))
const Contact     = lazy(() => import('@pages/Contact'))
const NotFound    = lazy(() => import('@pages/NotFound'))

// Loading spinner
const PageLoader = () => (
  <div className="min-h-screen bg-dark-100 flex items-center justify-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-2 border-neon-green rounded-full animate-ping opacity-30" />
      <div className="absolute inset-2 border-2 border-neon-green rounded-full animate-spin border-t-transparent" />
    </div>
  </div>
)

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/"                   element={<Home />} />
              <Route path="/about"              element={<About />} />
              <Route path="/services"           element={<Services />} />
              <Route path="/services/:slug"     element={<ServiceDetail />} />
              <Route path="/pricing"            element={<Pricing />} />
              <Route path="/portfolio"          element={<Portfolio />} />
              <Route path="/contact"            element={<Contact />} />
              <Route path="*"                   element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Router>
  )
}
