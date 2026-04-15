import Marquee from 'react-fast-marquee'
import { Zap } from 'lucide-react'

const ITEMS = [
  'Stream Overlays', 'Logo Design', 'Twitch Emotes', 'Thumbnail Design',
  'Video Editing', 'Stream Banners', 'Reels Editing', 'Channel Management',
  'YouTube Management', 'Reels Thumbnails', 'Gaming Logos', 'Stream Alerts',
]

export default function MarqueeBar() {
  return (
    <div className="relative py-4 border-y border-neon-green/20 bg-dark-200/50 overflow-hidden">
      {/* Left/right fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10
                      bg-gradient-to-r from-dark-100 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10
                      bg-gradient-to-l from-dark-100 to-transparent pointer-events-none" />

      <Marquee speed={40} gradient={false}>
        {ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-3 mx-8">
            <Zap size={12} className="text-neon-green flex-shrink-0" />
            <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-white/40">
              {item}
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
