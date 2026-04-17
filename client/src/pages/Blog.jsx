import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import CTASection from '@components/sections/CTASection'
import { BLOG_POSTS } from '@utils/blogData'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <>
      <Helmet>
        <title>Blog & Posts | thestreamingdesign</title>
        <meta name="description" content="Gaming design tips, streaming growth guides, YouTube strategies, and creator resources from thestreamingdesign." />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[length:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-hero-radial pointer-events-none" />
          <div className="section-container relative z-10 text-center">
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-block font-mono text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(57,255,20,0.8)' }}>
              // Creator Resources
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
              Blog &amp; <span style={{ color: '#39FF14', textShadow: '0 0 30px rgba(57,255,20,0.5)' }}>Posts</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-body text-white/50 text-lg max-w-2xl mx-auto">
              Streaming tips, design insights, YouTube growth strategies, and creator resources — all free.
            </motion.p>
          </div>
        </section>

        {/* ── Category filter ── */}
        <div className="sticky top-16 md:top-20 z-30 border-b py-4"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="section-container flex items-center gap-2 overflow-x-auto pb-1">
            {ALL_CATEGORIES.map(cat => {
              const count = cat === 'All' ? BLOG_POSTS.length : BLOG_POSTS.filter(p => p.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-display text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={{
                    background: isActive ? '#39FF14' : 'transparent',
                    color: isActive ? '#000' : 'rgba(255,255,255,0.45)',
                    border: isActive ? '1px solid #39FF14' : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isActive ? '0 0 16px rgba(57,255,20,0.5)' : 'none',
                  }}>
                  {cat}
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded"
                    style={{ background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)' }}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Blog Grid ── */}
        <section className="py-16">
          <div className="section-container">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(57,255,20,0.35)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(57,255,20,0.1)'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Cover image area */}
                  <div className={`aspect-video bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0" style={{ background: post.coverBg }} />
                    {/* Grid pattern */}
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
                      backgroundSize: '32px 32px',
                    }} />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-full"
                        style={{ background: `${post.tagColor}22`, border: `1px solid ${post.tagColor}55`, color: post.tagColor }}>
                        {post.tag}
                      </span>
                    </div>
                    {/* Read time */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 font-mono text-xs text-white/40">
                      <Clock size={11} />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs text-white/30">{post.date}</span>
                      <span className="text-white/15">·</span>
                      <span className="font-mono text-xs" style={{ color: 'rgba(57,255,20,0.6)' }}>{post.category}</span>
                    </div>

                    <h2 className="font-display font-bold text-white text-base leading-snug mb-3 group-hover:text-neon-green transition-colors duration-200">
                      {post.title}
                    </h2>

                    <p className="font-body text-white/45 text-sm leading-relaxed flex-1 mb-5">
                      {post.excerpt}
                    </p>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-widest uppercase transition-colors duration-200 mt-auto"
                      style={{ color: 'rgba(57,255,20,0.65)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#39FF14' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(57,255,20,0.65)' }}
                    >
                      Read More
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="font-display text-white/30 text-xl">No posts in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </motion.div>
    </>
  )
}
