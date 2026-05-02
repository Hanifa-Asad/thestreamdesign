import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, ArrowRight, ChevronRight } from 'lucide-react'
import { getBlogPost, getRelatedPosts, slugify } from '@utils/blogData'
import { isCmsEnabled, fetchCmsPostBySlug } from '@utils/contentfulClient'
import CTASection from '@components/sections/CTASection'

export default function BlogPost() {
  const { slug } = useParams()
  const routeSlug = slug?.toString().trim() || ''
  const normalizedSlug = slugify(routeSlug)
  const staticPost = getBlogPost(normalizedSlug)
  const [post, setPost] = useState(staticPost)
  const [loading, setLoading] = useState(!staticPost && isCmsEnabled())
  const [error, setError] = useState('')

  useEffect(() => {
    if (!routeSlug) {
      setLoading(false)
      return
    }

    if (!isCmsEnabled()) return

    setLoading(true)
    fetchCmsPostBySlug(normalizedSlug)
      .then((cmsPost) => {
        if (cmsPost) {
          setPost(cmsPost)
          setError('')
        } else if (!staticPost) {
          setPost(null)
          setError('This post is not available yet.')
        }
      })
      .catch((err) => {
        console.warn('[BlogPost] CMS fetch failed, using static post.', err)
        if (!staticPost) {
          setPost(null)
          setError('Unable to load fresh post content right now.')
        }
      })
      .finally(() => setLoading(false))
  }, [normalizedSlug, staticPost])

  if (loading) {
    return (
      <div className="section-container min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
        <p className="font-display text-3xl text-white mb-4">Loading post...</p>
        <p className="max-w-2xl text-white/50">Fetching the article content. Please wait a moment.</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="section-container min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
        <span className="font-mono text-xs uppercase tracking-[0.35em] mb-4" style={{ color: '#39FF14' }}>
          Blog post not found
        </span>
        <h1 className="font-display text-4xl text-white mb-4">We couldn't find that blog.</h1>
        <p className="max-w-2xl text-white/50 mb-8">
          {error || 'This blog may have been removed, renamed, or not published yet.'}
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  const related = getRelatedPosts(normalizedSlug, 3)

  return (
    <>
      <Helmet>
        <title>{post.title} | thestreamingdesign Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero cover ── */}
        <div className={`relative w-full bg-gradient-to-br ${post.gradient} overflow-hidden`}
          style={{ height: 'clamp(280px, 40vw, 480px)', paddingTop: '80px' }}>
          {/* Gaming character - left side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -left-32 bottom-0 w-80 h-96 pointer-events-none hidden lg:block"
          >
            <img 
              src="/characters/gaming-character-1.svg" 
              alt=""
              className="w-full h-full object-contain opacity-25"
              style={{ filter: 'drop-shadow(0 0 20px rgba(57,255,20,0.2))' }}
            />
          </motion.div>

          <div className="absolute inset-0" style={{ background: post.coverBg }} />
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.5) 0px,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 4px)',
          }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: 'linear-gradient(to top,#0a0a0a,transparent)' }} />

          {/* Breadcrumb */}
          <div className="absolute top-24 left-0 right-0">
            <div className="section-container">
              <div className="flex items-center gap-2 font-mono text-xs text-white/30">
                <Link to="/" className="hover:text-neon-green transition-colors">Home</Link>
                <ChevronRight size={10} />
                <Link to="/blog" className="hover:text-neon-green transition-colors">Blog</Link>
                <ChevronRight size={10} />
                <span style={{ color: 'rgba(57,255,20,0.7)' }}>{post.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Article container ── */}
        <div className="section-container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">

          {/* Tag + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-xs px-3 py-1 rounded-full"
              style={{ background: `${post.tagColor}1a`, border: `1px solid ${post.tagColor}40`, color: post.tagColor }}>
              {post.tag}
            </span>
            <span className="font-mono text-xs text-white/30">{post.category}</span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-white/30">
              <Calendar size={11} /> {post.date}
            </span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-white/30">
              <Clock size={11} /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl text-white leading-tight mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Divider */}
          <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg,rgba(57,255,20,0.4),transparent)' }} />

          {post.imageUrl && (
            <div className="overflow-hidden rounded-[2rem] mb-8 border border-white/10 bg-slate-950/20">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[520px]"
                loading="lazy"
              />
            </div>
          )}

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="prose prose-invert max-w-none"
          >
            {post.content.map((block, i) => {
              if (block.type === 'intro') {
                return (
                  <p key={i} className="font-body text-white/70 text-lg leading-[1.8] mb-7 border-l-2 pl-5"
                    style={{ borderColor: 'rgba(57,255,20,0.5)' }}>
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="font-display font-black text-xl text-white mt-10 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 rounded-full inline-block flex-shrink-0" style={{ background: '#39FF14', boxShadow: '0 0 8px rgba(57,255,20,0.6)' }} />
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'text') {
                return (
                  <p key={i} className="font-body text-white/55 text-base leading-[1.85] mb-5">
                    {block.text}
                  </p>
                )
              }
              return null
            })}
          </motion.div>

          {/* Back button */}
          <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <Link to="/blog"
              className="inline-flex items-center gap-2 font-display font-bold text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'rgba(57,255,20,0.6)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#39FF14' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(57,255,20,0.6)' }}
            >
              <ArrowLeft size={13} />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* ── Related Posts ── */}
        {related.length > 0 && (
          <section className="py-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="section-container">
              <h2 className="font-display font-black text-2xl text-white mb-8 flex items-center gap-3">
                <span className="w-1 h-7 rounded-full" style={{ background: '#39FF14', boxShadow: '0 0 8px rgba(57,255,20,0.6)' }} />
                Related Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((rp, i) => (
                  <motion.div key={rp.id}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group rounded-xl overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.3s, transform 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(57,255,20,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div className={`aspect-video bg-gradient-to-br ${rp.gradient} relative`}>
                      <div className="absolute inset-0" style={{ background: rp.coverBg }} />
                    </div>
                    <div className="p-4">
                      <span className="font-mono text-xs mb-2 block" style={{ color: 'rgba(57,255,20,0.6)' }}>{rp.category}</span>
                      <h3 className="font-display font-bold text-white text-sm leading-snug mb-3 line-clamp-2">{rp.title}</h3>
                      <Link to={`/blog/${rp.slug}`}
                        className="inline-flex items-center gap-1.5 font-display text-xs font-bold tracking-widest uppercase"
                        style={{ color: 'rgba(57,255,20,0.6)' }}>
                        Read More <ArrowRight size={11} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </motion.div>
    </>
  )
}
