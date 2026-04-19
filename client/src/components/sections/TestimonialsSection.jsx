import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '@components/ui/SectionHeader'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'XxShadowStrikerxX',
    role: 'Twitch Streamer · 50K Followers',
    avatar: 'SS',
    color: 'bg-purple-500',
    rating: 5,
    text: 'thestreamingdesign completely transformed my channel. The overlay pack they built for me is absolutely insane — my viewers keep asking where I got it. 10/10 would recommend to every streamer.',
    service: 'Stream Overlay Package',
  },
  {
    id: 2,
    name: 'GamingWithRylee',
    role: 'YouTuber · 120K Subscribers',
    avatar: 'GR',
    color: 'bg-red-500',
    rating: 5,
    text: 'My CTR went from 4% to 9.2% after switching to their thumbnail designs. These guys understand what makes people click. Worth every penny and then some.',
    service: 'Thumbnail Design',
  },
  {
    id: 3,
    name: 'VoidRealmGaming',
    role: 'Content Creator · Twitch & YouTube',
    avatar: 'VR',
    color: 'bg-cyan-600',
    rating: 5,
    text: 'Fastest turnaround I have ever seen. Ordered the full branding package on a Monday, had everything in my hands by Wednesday. Quality was premium from the start.',
    service: 'Full Brand Package',
  },
  {
    id: 4,
    name: 'NightOwlStreams',
    role: 'Twitch Affiliate · 8K Followers',
    avatar: 'NO',
    color: 'bg-indigo-500',
    rating: 5,
    text: 'As a smaller streamer I was worried about the cost, but the Basic plan gave me more than I expected. My channel looks pro now and my follower growth has noticeably picked up.',
    service: 'Logo & Banner Design',
  },
  {
    id: 5,
    name: 'PixelQueenTV',
    role: 'YouTube Gaming · 35K Subscribers',
    avatar: 'PQ',
    color: 'bg-pink-500',
    rating: 5,
    text: 'The communication was top tier. They asked the right questions before starting and nailed my brand identity on the first draft. Barely needed any revisions.',
    service: 'YouTube Management',
  },
  {
    id: 6,
    name: 'TacticalAceGG',
    role: 'Twitch Partner · 200K Followers',
    avatar: 'TA',
    color: 'bg-green-600',
    rating: 5,
    text: 'I have worked with multiple design agencies. thestreamingdesign is the only one that truly gets gaming culture. The emotes my community uses daily came from these guys.',
    service: 'Twitch Emotes Pack',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative bg-dark-200/20 overflow-hidden">
      {/* Gaming character accent - top left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 -left-24 w-64 h-64 pointer-events-none hidden lg:block"
      >
        <img 
          src="/characters/gaming-character-1.svg" 
          alt=""
          className="w-full h-full object-contain opacity-30"
          style={{ filter: 'drop-shadow(0 0 15px rgba(57,255,20,0.2))' }}
        />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeader
          label="Client Reviews"
          title="What Creators"
          titleHighlight="Say"
          subtitle="Real feedback from real streamers and YouTubers who leveled up with thestreamingdesign."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="glass-card p-6 flex flex-col gap-4
                         hover:border-neon-green/30 hover:shadow-card-hover
                         transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-neon-green/30 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="text-neon-green fill-neon-green" />
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-white/60 text-sm leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Service badge */}
              <span className="inline-block font-mono text-xs text-neon-green/60
                               border border-neon-green/20 px-3 py-1 rounded-full w-fit">
                {t.service}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center
                                 font-display font-bold text-xs text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white tracking-wide">
                    {t.name}
                  </div>
                  <div className="font-body text-white/40 text-xs">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
    </section>
  )
}
