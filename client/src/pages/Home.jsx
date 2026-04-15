import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import HeroSection             from '@components/sections/HeroSection'
import BannerCarousel          from '@components/sections/BannerCarousel'
import MarqueeBar              from '@components/sections/MarqueeBar'
import ServicesPreviewSection  from '@components/sections/ServicesPreviewSection'
import WhyUsSection            from '@components/sections/WhyUsSection'
import PortfolioPreviewSection from '@components/sections/PortfolioPreviewSection'
import TestimonialsSection     from '@components/sections/TestimonialsSection'
import CTASection              from '@components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>TheStreamDesign | Premium Gaming & Streaming Design Agency</title>
        <meta name="description" content="Professional stream overlays, gaming logos, Twitch emotes, YouTube thumbnails and more. Designed exclusively for gamers, streamers and YouTubers." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeroSection />
        <BannerCarousel />
        <MarqueeBar />
        <ServicesPreviewSection />
        <WhyUsSection />
        <PortfolioPreviewSection />
        <TestimonialsSection />
        <CTASection />
      </motion.div>
    </>
  )
}
