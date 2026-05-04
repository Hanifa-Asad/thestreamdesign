// ─── Blog / Posts Data ───────────────────────────────────────────────────────
// No static dummy blog posts are included. Use CMS or API-backed content instead.
// This file keeps the same helper API surface for the blog pages.

const slugify = (value) => {
  if (!value) return ''
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const normalizeBlogPost = (post) => {
  const title = post?.title || ''
  const rawSlug = typeof post?.slug === 'string' ? slugify(post.slug) : ''
  const slug = rawSlug || slugify(title) || post?.id || `post-${Date.now()}`
  const id = post?.id || slug || `post-${slugify(title) || 'item'}`

  return {
    ...post,
    id,
    slug,
  }
}

export const BLOG_POSTS = []

const NORMALIZED_BLOG_POSTS = BLOG_POSTS.map(normalizeBlogPost)

export { slugify, normalizeBlogPost }
export const getBlogPost = (slug) => {
  const normalizedSlug = slugify(slug)
  return NORMALIZED_BLOG_POSTS.find((post) => slugify(post.slug) === normalizedSlug)
}

export const getRelatedPosts = (slug, limit = 3) => {
  const normalizedSlug = slugify(slug)
  return NORMALIZED_BLOG_POSTS.filter((post) => slugify(post.slug) !== normalizedSlug).slice(0, limit)
}

export const getStaticBlogPosts = () => NORMALIZED_BLOG_POSTS
