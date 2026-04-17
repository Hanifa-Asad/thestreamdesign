import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import GlowButton from '@components/ui/GlowButton'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — Page Not Found | thestreamingdesign</title></Helmet>
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
        <div className="text-center relative z-10 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display font-black text-[12rem] sm:text-[16rem] leading-none text-white/5 select-none">
              404
            </h1>
            <div className="-mt-16 sm:-mt-24">
              <p className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-4">// Page Not Found</p>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">You're Off The Map</h2>
              <p className="font-body text-white/40 mb-10 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved. Let's get you back in the game.</p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <GlowButton as="link" to="/" icon={<Home size={16} />}>Back to Home</GlowButton>
                <GlowButton as="link" to="/services" variant="outline" icon={<ArrowLeft size={16} />}>View Services</GlowButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
