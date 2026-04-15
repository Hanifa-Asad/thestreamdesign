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
  { icon: Target,   title: 'Gaming-First Mindset',   desc: 'We do not just design for gamers — we are gamers ourselves. Every pixel carries authentic gaming culture, not generic trends.' },
  { icon: Shield,   title: 'Quality Without Excuses', desc: 'We refuse to deliver work that is "good enough". Every project goes through a rigorous quality check before it reaches you.' },
  { icon: TrendingUp, title: 'Results-Driven Design', desc: 'Good design is not just beautiful — it converts. We measure success by your follower growth, click-through rates, and community engagement.' },
  { icon: Users,    title: 'Creators First',          desc: 'Your timeline, budget, and vision come first. We adapt to you, not the other way around. No rigid processes, just real collaboration.' },
]

const TEAM = [
  { initials: 'AK', name: 'Ahmad K.',      role: 'Lead Designer',          color: 'bg-green-700',  bio: 'Expert in stream branding with 5+ years working with top Twitch streamers.' },
  { initials: 'SR', name: 'Sara R.',       role: 'Motion & Video Editor',  color: 'bg-purple-700', bio: 'Specialises in animated overlays and video editing for YouTube channels.' },
  { initials: 'ZM', name: 'Zain M.',       role: 'Brand Strategist',       color: 'bg-blue-700',   bio: 'Helps creators build long-term brand identities that grow their audiences.' },
  { initials: 'NF', name: 'Nour F.',       role: 'Thumbnail Specialist',   color: 'bg-red-700',    bio: 'Data-driven thumbnail designer — A/B tested strategies that boost CTR.' },
]

const MILESTONES = [
  { year: '2021', title: 'Founded',              desc: 'TheStreamDesign launches as a freelance overlay studio serving local streamers.' },
  { year: '2022', title: 'First 100 Clients',    desc: 'Word of mouth grows the studio to 100 clients and we expand into YouTube services.' },
  { year: '2023', title: 'Full Agency',           desc: 'We assemble a full team, launch all 11 services, and hit 300+ projects delivered.' },
  { year: '2024', title: 'Global Reach',          desc: '500+ projects, clients on 4 continents, and a 4.9★ average satisfaction rating.' },
]

export default function About() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <>
      <Helmet>
        <title>About | TheStreamDesign</title>
        <meta name="description" content="TheStreamDesign is a premium gaming and digital services agency built exclusively for gamers, streamers, and YouTubers." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-block font-mono text-neon-green text-xs tracking-[0.3em] uppercase mb-5">
                  // Our Story
                </motion.span>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
                  Built By <span className="text-neon-green">Gamers</span>, For Creators
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-body text-white/60 text-lg leading-relaxed mb-8">
                  TheStreamDesign was born out of frustration. Every design agency we found was built for corporate clients — not for streamers grinding to build their community, or YouTubers hustling to grow their channel.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="font-body text-white/60 text-lg leading-relaxed mb-10">
                  So we built our own. A studio that speaks fluent gaming, understands streaming culture, and delivers work that actually looks like it belongs in your niche.
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

        {/* ── Mission & Vision ── */}
        <section className="py-24">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Target,
                  label: 'Our Mission',
                  title: 'Empower Every Creator',
                  body: 'To make professional-grade branding accessible to every gamer, streamer, and content creator — regardless of their current size, budget, or experience. We believe every creator deserves a brand that reflects their unique identity and commands respect.',
                },
                {
                  icon: Eye,
                  label: 'Our Vision',
                  title: 'The Agency for Gaming Culture',
                  body: 'To become the most trusted creative partner in the gaming and streaming industry — the name every streamer mentions when someone asks "who did your overlays?" We measure success by how much our clients grow.',
                },
              ].map(({ icon: Icon, label, title, body }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="glass-card p-8 hover:border-neon-green/40 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-neon-green/10 flex items-center justify-center mb-6">
                    <Icon size={22} className="text-neon-green" />
                  </div>
                  <p className="font-mono text-neon-green text-xs tracking-widest uppercase mb-2">// {label}</p>
                  <h3 className="font-display font-black text-2xl text-white mb-4">{title}</h3>
                  <p className="font-body text-white/50 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 bg-dark-200/30">
          <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-neon-green/20 to-transparent" />
          <div className="section-container">
            <div className="text-center mb-14">
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// What Drives Us</span>
              <h2 className="font-display font-black text-4xl text-white mt-3">Our Core <span className="text-neon-green">Values</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {VALUES.map(({ icon: Icon, title, desc }, i) => (
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
                    <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">{title}</h4>
                    <p className="font-body text-white/50 text-sm leading-relaxed">{desc}</p>
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
              <span className="font-mono text-neon-green text-xs tracking-[0.3em] uppercase">// The Crew</span>
              <h2 className="font-display font-black text-4xl text-white mt-3">Meet The <span className="text-neon-green">Team</span></h2>
              <p className="font-body text-white/40 max-w-xl mx-auto mt-4">A small but mighty team of designers, editors, and strategists obsessed with gaming culture.</p>
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

        <CTASection />
      </motion.div>
    </>
  )
}
