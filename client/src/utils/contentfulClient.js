const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const contentType = import.meta.env.VITE_CONTENTFUL_BLOG_CONTENT_TYPE || 'blogPost'

const isConfigured = Boolean(spaceId && accessToken)
const baseUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`

const textFromNode = (node) => {
  if (!node) return ''
  if (node.nodeType === 'text') return node.value || ''
  if (node.content) return node.content.map(textFromNode).join('')
  return ''
}

const flattenRichText = (node) => {
  if (!node) return []
  if (node.nodeType === 'document') {
    return node.content.flatMap(flattenRichText)
  }

  if (node.nodeType === 'paragraph') {
    const text = node.content.map(textFromNode).join('')
    return text ? [{ type: 'text', text }] : []
  }

  if (node.nodeType === 'heading-1' || node.nodeType === 'heading-2' || node.nodeType === 'heading-3') {
    const text = node.content.map(textFromNode).join('')
    return text ? [{ type: 'heading', text }] : []
  }

  if (node.nodeType === 'list-item') {
    return node.content.flatMap(flattenRichText)
  }

  if (node.content) {
    return node.content.flatMap(flattenRichText)
  }

  return []
}

const parseContentValue = (content) => {
  if (!content) return []

  if (Array.isArray(content)) {
    return content.map((block) => {
      if (typeof block === 'string') return { type: 'text', text: block }
      if (block.type && block.text) return { type: block.type, text: block.text }
      if (block.nodeType) return flattenRichText(block)
      return null
    }).flat().filter(Boolean)
  }

  if (typeof content === 'string') {
    return [{ type: 'intro', text: content }]
  }

  if (content.nodeType) {
    return flattenRichText(content)
  }

  return []
}

const computeReadTime = (contentBlocks) => {
  const plainText = contentBlocks
    .map((block) => typeof block.text === 'string' ? block.text : '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  const words = plainText.split(' ').filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 180))
  return `${minutes} min read`
}

const resolveLocalizedValue = (value) => {
  if (value == null) return value
  if (typeof value !== 'object' || Array.isArray(value)) return value
  const localeValues = Object.values(value).filter((v) => v !== undefined && v !== null)
  return localeValues.length ? localeValues[0] : value
}

const resolveAssetUrl = (asset) => {
  const resolvedAsset = resolveLocalizedValue(asset)
  if (!resolvedAsset) return ''
  const url = resolvedAsset.fields?.file?.url || resolvedAsset.file?.url || ''
  if (!url) return ''
  return url.startsWith('//') ? `https:${url}` : url
}

const mapContentfulEntryToPost = (entry) => {
  const fields = entry.fields || {}
  const title = resolveLocalizedValue(fields.title)
  const slug = resolveLocalizedValue(fields.slug)
  const description = resolveLocalizedValue(fields.description)
  const contentField = resolveLocalizedValue(fields.content || fields.body)
  const contentBlocks = parseContentValue(contentField)
  const readTime = resolveLocalizedValue(fields.readTime) || computeReadTime(contentBlocks)
  const imageUrl = resolveAssetUrl(fields.image)
  const rawDate = resolveLocalizedValue(fields.date) || entry.sys?.publishedAt || entry.sys?.createdAt

  return {
    id: entry.sys?.id || slug || title || 'cms-post',
    slug: slug || entry.sys?.id || title?.toLowerCase().replace(/[^a-z0-9]+/gi, '-'),
    title: title || 'Untitled post',
    excerpt: description || fields.excerpt || fields.summary || '',
    category: resolveLocalizedValue(fields.category) || resolveLocalizedValue(fields.tag) || 'Creator',
    tag: resolveLocalizedValue(fields.tag) || resolveLocalizedValue(fields.category) || 'Blog',
    tagColor: resolveLocalizedValue(fields.tagColor) || '#39FF14',
    readTime,
    date: rawDate ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
    gradient: fields.gradient || 'from-purple-900 to-black',
    coverBg: imageUrl
      ? `url("${imageUrl}") center/cover no-repeat`
      : fields.coverBg || 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(57,255,20,0.25) 0%, transparent 70%)',
    imageUrl,
    content: contentBlocks.length ? contentBlocks : [{ type: 'intro', text: fields.description || fields.excerpt || 'Read the full article for more insights.' }],
  }
}

const fetchFromContentful = async (path) => {
  if (!isConfigured) {
    throw new Error('Contentful is not configured. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.')
  }

  const url = `${baseUrl}${path}&access_token=${accessToken}`
  const response = await fetch(url)
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Contentful fetch failed: ${response.status} ${response.statusText} — ${body}`)
  }

  return response.json()
}

export const fetchCmsPosts = async () => {
  const response = await fetchFromContentful(`/entries?content_type=${contentType}&order=-sys.publishedAt&limit=100&include=2`)
  const posts = response.items?.map(mapContentfulEntryToPost).filter(Boolean) || []
  return posts
}

export const fetchCmsPostBySlug = async (slug) => {
  if (!slug) return null
  const response = await fetchFromContentful(`/entries?content_type=${contentType}&fields.slug=${encodeURIComponent(slug)}&limit=1&include=2`)
  const item = response.items?.[0]
  return item ? mapContentfulEntryToPost(item) : null
}

export const isCmsEnabled = () => isConfigured
