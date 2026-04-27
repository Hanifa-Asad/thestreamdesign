import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import {
  Target, Eye, Zap, Users, Gamepad2, TrendingUp,
  Shield, Star, ArrowRight
} from 'lucide-react'
import GlowButton from '@components/ui/GlowButton'
import CTASection from '@components/sections/CTASection'

const STATS = [
  { value: 500,  suffix: '+', label: 'Projects Delivered',    icon: Zap      },
  { value: 200,  suffix: '+', label: 'Happy Clients',         icon: Users    },
  { value: 3,    suffix: '+', label: 'Years in Gaming Design', icon: Gamepad2 },
  { value: 4.9,  suffix: '★', label: 'Average Rating',        icon: Star, decimals: 1 },
]

const VALUES = [
  { icon: Target,   title: "Great stream branding shouldn't cost a fortune", desc: '' },
  { icon: Shield,   title: 'Every creator deserves a strategy, not just pretty graphics', desc: '' },
  { icon: TrendingUp, title: 'Growth happens when design and content work together', desc: '' },
  { icon: Users,    title: 'Gaming culture is unique — and your brand should reflect that', desc: '' },
]

const TEAM = [
  { initials: 'AK', name: 'Ahmad K.',      role: 'Lead Designer',          color: 'bg-green-700',  bio: 'Expert in stream branding with 5+ years working with top Twitch streamers.' },
  { initials: 'SR', name: 'Sara R.',       role: 'Motion & Video Editor',  color: 'bg-purple-700', bio: 'Specialises in animated overlays and video editing for YouTube channels.' },
  { initials: 'ZM', name: 'Zain M.',       role: 'Brand Strategist',       color: 'bg-blue-700',   bio: 'Helps creators build long-term brand identities that grow their audiences.' },
  { initials: 'NF', name: 'Nour F.',       role: 'Thumbnail Specialist',   color: 'bg-red-700',    bio: 'Data-driven thumbnail designer — A/B tested strategies that boost CTR.' },
]

const MILESTONES = [
  { year: '2021', title: 'Founded',              desc: 'thestreamingdesign launches as a freelance overlay studio serving local streamers.' },
  { year: '2022', title: 'First 100 Clients',    desc: 'Word of mouth grows the studio to 100 clients and we expand into YouTube services.' },
  { year: '2023', title: 'Full Agency',           desc: 'We assemble a full team, launch all 11 services, and hit 300+ projects delivered.' },
  { year: '2024', title: 'Global Reach',          desc: '500+ projects, clients on 4 continents, and a 4.9★ average satisfaction rating.' },
]

export default function About() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <>
      <Helmet>
        <title>About | thestreamingdesign</title>
        <meta name="description" content="thestreamingdesign is a premium gaming and digital services agency built exclusively for gamers, streamers, and YouTubers." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-24 overflow-hidden">          {/* Gaming character - left accent */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-56 h-72 pointer-events-none hidden lg:block"
          >
            <img 
              src="/characters/gaming-character-3.svg" 
              alt=""
              className="w-full h-full object-contain opacity-50"
              style={{ filter: 'drop-shadow(0 0 25px rgba(57,255,20,0.3))' }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-5">
                  // Our Story
                </motion.span>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
                  We&apos;re The Stream Design — A Creative Agency Built for Gamers.
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-white/60 text-md leading-relaxed mb-8">
                  We started as streamers. We know the grind. Now we help others win it.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="font-body text-white/60 text-lg leading-relaxed mb-6">
                  We built The Stream Design because we lived the problem — spending hours searching for good overlays, logos, and YouTube help, only to find generic stuff that didn&apos;t fit gaming culture at all.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="font-body text-white/60 text-lg leading-relaxed mb-6">
                  So we built something better.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-body text-white/60 text-lg leading-relaxed mb-10">
                  Today, we&apos;re a full-service streaming design and growth agency helping solo streamers, gaming YouTubers, and esports teams build brands that actually stand out. From twitch branding kits to YouTube channel audit and optimization services — everything we do is made for the gaming world.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
                  <GlowButton as="link" to="/services" size="lg" iconRight={<ArrowRight size={16} />}>
                    Explore Services
                  </GlowButton>
                  <GlowButton as="link" to="/portfolio" variant="outline" size="lg">
                    View Our Work
                  </GlowButton>
                </motion.div>
              </div>

              {/* Visual block */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-neon-green/20 bg-dark-300 p-8">
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-neon-green/50" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-neon-green/50" />

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Gamers & Streamers', items: ['Logo Design', 'Stream Banners', 'Stream Overlays', 'Twitch Emotes'], color: 'border-neon-green/30' },
                      { label: 'YouTubers',           items: ['Logo & Banner', 'Thumbnails', 'Video Editing', 'Channel Mgmt'],    color: 'border-purple-500/30' },
                    ].map(col => (
                      <div key={col.label}>
                        <p className={`font-mono text-xs text-white/30 uppercase tracking-widest mb-3 pb-2 border-b ${col.color}`}>{col.label}</p>
                        <ul className="space-y-2">
                          {col.items.map(item => (
                            <li key={item} className="flex items-center gap-2 font-body text-white/50 text-sm">
                              <Zap size={10} className="text-neon-green flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-white/25 text-xs">Est. 2021</span>
                    <span className="font-mono text-neon-green text-xs">// 100% Remote</span>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-neon-green/5 rounded-3xl blur-2xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-16 bg-dark-200/40 border-y border-neon-green/10" ref={statsRef}>
          <div className="section-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map(({ value, suffix, label, icon: Icon, decimals = 0 }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neon-green/10 flex items-center justify-center group-hover:bg-neon-green/20 transition-colors">
                    <Icon size={20} className="text-neon-green" />
                  </div>
                  <div className="font-display font-black text-4xl text-neon-green mb-1">
                    {statsInView
                      ? <CountUp end={value} duration={2.5} decimals={decimals} suffix={suffix} />
                      : `0${suffix}`
                    }
                  </div>
                  <p className="font-body text-white/40 text-sm uppercase tracking-widest">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-24">
          <div className="section-container max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Our Mission</span>
              <h2 className="font-display font-black text-4xl text-white mt-3">
                Our Mission is Simple. To give every streamer — big or small — access to professional-level design, strategy, and support that helps them grow faster and look better doing it.
              </h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-10 hover:border-neon-green/40 hover:shadow-card-hover transition-all duration-300"
            >
              <p className="font-body text-white/60 leading-relaxed">
                Every creator deserves a professional-level brand that works as hard as they do. We blend design, strategy, and hands-on support so streamers can focus on content while we help their channel, community, and visual identity grow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 bg-dark-200/30">
          <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
          <div className="section-container">
            <div className="text-center mb-14">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// What We Believe</span>
              <h2 className="font-display font-black text-4xl text-white mt-3">What We <span className="text-neon-green">Believe</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {VALUES.map(({ icon: Icon, title }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-5 p-6 rounded-xl border border-white/5 hover:border-neon-green/25 bg-dark-300/50 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-lg bg-neon-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-green/20 transition-colors">
                    <Icon size={20} className="text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide">{title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="py-24">
          <div className="section-container max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// How We Got Here</span>
              <h2 className="font-display font-black text-4xl text-white mt-3">Our <span className="text-neon-green">Journey</span></h2>
            </div>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-green/60 via-neon-green/20 to-transparent" />

              <div className="space-y-10">
                {MILESTONES.map(({ year, title, desc }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-6 pl-10 relative"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-dark-300 border-2 border-neon-green/50 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-neon-green" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-display font-black text-neon-green text-sm">{year}</span>
                        <h4 className="font-display font-bold text-white text-base">{title}</h4>
                      </div>
                      <p className="font-body text-white/50 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-20 bg-dark-200/30">
          <div className="section-container">
            <div className="text-center mb-14">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// Our Team</span>
              <h2 className="font-display font-black text-4xl text-white mt-3">Creators, Designers &amp; Strategists — All Under One Roof.</h2>
              <p className="font-body text-white/40 max-w-xl mx-auto mt-4">We&apos;re a team of passionate gamers, experienced designers, and YouTube strategists who understand your world because we live in it too.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map(({ initials, name, role, color, bio }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-6 text-center group hover:border-neon-green/40 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${color} rounded-2xl mx-auto mb-4 flex items-center justify-center font-display font-black text-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                    {initials}
                  </div>
                  <h4 className="font-display font-bold text-white text-base mb-1">{name}</h4>
                  <p className="font-mono text-neon-green text-xs mb-3">{role}</p>
                  <p className="font-body text-white/40 text-xs leading-relaxed">{bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          label="// Work With Us"
          heading="Let's Build Something Great Together."
          primaryText="Work With Us"
          primaryLink="/contact"
        />
      </motion.div>
    </>
  )
}
