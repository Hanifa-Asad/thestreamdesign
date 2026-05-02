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

  if (node.nodeType === 'paragraph' || node.nodeType === 'blockquote') {
    const text = node.content.map(textFromNode).join('')
    return text ? [{ type: 'text', text }] : []
  }

  if (/^heading-\d+$/.test(node.nodeType)) {
    const text = node.content.map(textFromNode).join('')
    return text ? [{ type: 'heading', text }] : []
  }

  if (node.nodeType === 'list-item' || node.nodeType === 'unordered-list' || node.nodeType === 'ordered-list') {
    return node.content.flatMap(flattenRichText)
  }

  if (node.nodeType === 'hyperlink' || node.nodeType === 'entry-hyperlink') {
    const text = node.content.map(textFromNode).join('')
    return text ? [{ type: 'text', text }] : []
  }

  if (node.content) {
    return node.content.flatMap(flattenRichText)
  }

  return []
}

const normalizeRawContent = (content) => {
  if (!content) return null
  if (typeof content === 'string') return content
  if (content.raw && typeof content.raw === 'string') {
    try {
      return JSON.parse(content.raw)
    } catch (err) {
      return content.raw
    }
  }
  if (content.json) {
    try {
      return typeof content.json === 'string' ? JSON.parse(content.json) : content.json
    } catch (err) {
      return content.json
    }
  }
  if (content.nodeType || Array.isArray(content)) return content

  const values = Object.values(content).filter((value) => value !== undefined && value !== null)
  return values.length ? normalizeRawContent(values[0]) : null
}

const parseContentValue = (content) => {
  const normalized = normalizeRawContent(content)
  if (!normalized) return []

  if (Array.isArray(normalized)) {
    return normalized.map((block) => {
      if (typeof block === 'string') return { type: 'text', text: block }
      if (block.type && block.text) return { type: block.type, text: block.text }
      if (block.nodeType) return flattenRichText(block)
      return null
    }).flat().filter(Boolean)
  }

  if (typeof normalized === 'string') {
    return [{ type: 'intro', text: normalized }]
  }

  if (normalized.nodeType) {
    return flattenRichText(normalized)
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

const isLocaleKey = (key) => /^[a-z]{2}(-[A-Z]{2})?$/.test(key)

const resolveLocalizedValue = (value) => {
  if (value == null) return value
  if (Array.isArray(value)) return value
  if (typeof value !== 'object') return value

  const keys = Object.keys(value)
  const localeKeys = keys.filter(isLocaleKey)
  if (localeKeys.length > 0) {
    const localeValues = localeKeys
      .map((key) => value[key])
      .filter((v) => v !== undefined && v !== null)
    return localeValues.length ? localeValues[0] : null
  }

  return value
}

const isLinkObject = (value) => value && value.sys && value.sys.type === 'Link'

const resolveLinkValue = (value, includeMap = {}) => {
  const resolved = resolveLocalizedValue(value)
  if (!resolved) return resolved

  if (Array.isArray(resolved)) {
    return resolveLinkValue(resolved[0], includeMap)
  }

  if (isLinkObject(resolved) && resolved.sys.linkType === 'Asset') {
    return includeMap[resolved.sys.id] || resolved
  }

  return resolved
}

const resolveAssetUrl = (asset, includeMap = {}) => {
  const resolvedAsset = resolveLinkValue(asset, includeMap)
  if (!resolvedAsset) return ''

  const resolvedFields = resolveLocalizedValue(resolvedAsset.fields)
  const resolvedFile = resolveLocalizedValue(resolvedFields?.file) || resolveLocalizedValue(resolvedAsset.file)
  const url = resolvedFile?.url || resolvedFile?.details?.image?.src || ''

  if (!url) return ''
  return url.startsWith('//') ? `https:${url}` : url
}

const parseJsonField = (value) => {
  if (!value) return null
  if (typeof value === 'object') return value
  if (typeof value !== 'string') return null
  try {
    return JSON.parse(value)
  } catch (err) {
    return null
  }
}

const isRichTextDocument = (value) => {
  const normalized = resolveLocalizedValue(value)
  if (!normalized || typeof normalized !== 'object') return false
  if (normalized.nodeType === 'document') return true
  const parsed = parseJsonField(normalized.raw) || parseJsonField(normalized.json)
  return parsed?.nodeType === 'document'
}

const findRichTextField = (fields) => {
  const excludedFields = new Set(['title', 'slug', 'description', 'image', 'excerpt', 'summary', 'readTime', 'category', 'tag', 'tagColor', 'date', 'gradient', 'coverBg'])
  return Object.keys(fields).reduce((found, key) => {
    if (found) return found
    if (excludedFields.has(key)) return found
    if (isRichTextDocument(fields[key])) return fields[key]
    return found
  }, null)
}

const getPostContent = (fields) => {
  return resolveLocalizedValue(
    fields.richText || fields.richtext || fields.content || fields.body || fields.articleBody || fields.description || findRichTextField(fields)
  )
}

const getPostImageField = (fields) => {
  return resolveLocalizedValue(
    fields.image || fields.coverImage || fields.featuredImage || fields.thumbnail || fields.cover || fields.heroImage || fields.bannerImage
  )
}

const mapContentfulEntryToPost = (entry, includeMap = {}) => {
  const fields = entry.fields || {}
  const title = resolveLocalizedValue(fields.title)
  const slug = resolveLocalizedValue(fields.slug)
  const description = resolveLocalizedValue(fields.description)
  const contentField = getPostContent(fields)
  const contentBlocks = parseContentValue(contentField)
  const readTime = resolveLocalizedValue(fields.readTime) || computeReadTime(contentBlocks)
  const imageUrl = resolveAssetUrl(getPostImageField(fields), includeMap)
  const rawDate = resolveLocalizedValue(fields.date) || entry.sys?.publishedAt || entry.sys?.createdAt

  return {
    id: entry.sys?.id || slug || title || 'cms-post',
    slug: slug || normalizeSlug(title) || entry.sys?.id || 'cms-post',
    title: title || 'Untitled post',
    excerpt: description || resolveLocalizedValue(fields.excerpt) || resolveLocalizedValue(fields.summary) || '',
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
    content: contentBlocks.length ? contentBlocks : [{ type: 'intro', text: description || 'Read the full article for more insights.' }],
  }
}

const fetchFromContentful = async (path) => {
  if (!isConfigured) {
    throw new Error('Contentful is not configured. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.')
  }

  const separator = path.includes('?') ? '&' : '?'
  const url = `${baseUrl}${path}${separator}access_token=${accessToken}`
  const response = await fetch(url)
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Contentful fetch failed: ${response.status} ${response.statusText} — ${body}`)
  }

  return response.json()
}

const buildIncludeMap = (includes) => {
  const map = {}
  if (!includes) return map
  const assets = includes.Asset || []
  assets.forEach((asset) => {
    if (asset?.sys?.id) {
      map[asset.sys.id] = asset
    }
  })
  return map
}

const fetchContentfulAsset = async (assetId) => {
  if (!assetId) return null
  const response = await fetchFromContentful(`/assets/${encodeURIComponent(assetId)}`)
  return response
}

const ensureResolvedAssets = async (entry, includeMap) => {
  if (!entry?.fields) return includeMap
  const imageField = getPostImageField(entry.fields)
  if (isLinkObject(imageField) && imageField.sys.linkType === 'Asset') {
    const assetId = imageField.sys.id
    if (assetId && !includeMap[assetId]) {
      const asset = await fetchContentfulAsset(assetId)
      if (asset?.sys?.id) {
        includeMap[asset.sys.id] = asset
      }
    }
  }
  return includeMap
}

export const fetchCmsPosts = async () => {
  const response = await fetchFromContentful(`/entries?content_type=${contentType}&order=-sys.publishedAt&limit=100&include=2`)
  const includeMap = buildIncludeMap(response.includes)

  const posts = await Promise.all(
    (response.items || []).map(async (item) => {
      const itemIncludeMap = { ...includeMap }
      await ensureResolvedAssets(item, itemIncludeMap)
      return mapContentfulEntryToPost(item, itemIncludeMap)
    })
  )

  return posts.filter(Boolean)
}

const normalizeSlug = (value) => {
  if (!value) return ''
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export const fetchCmsPostBySlug = async (slug) => {
  if (!slug) return null
  const rawSlug = String(slug).trim()
  const normalizedSlug = normalizeSlug(rawSlug)

  const fetchBySlug = async (slugValue) => {
    const response = await fetchFromContentful(
      `/entries?content_type=${contentType}&fields.slug=${encodeURIComponent(slugValue)}&limit=1&include=2`
    )
    return { item: response.items?.[0], includeMap: buildIncludeMap(response.includes) }
  }

  let { item, includeMap } = await fetchBySlug(rawSlug)

  if (!item && normalizedSlug && normalizedSlug !== rawSlug) {
    const result = await fetchBySlug(normalizedSlug)
    item = result.item
    includeMap = result.includeMap
  }

  if (!item && normalizedSlug) {
    const searchTerm = encodeURIComponent(rawSlug.replace(/-/g, ' '))
    const response = await fetchFromContentful(
      `/entries?content_type=${contentType}&query=${searchTerm}&limit=5&include=2`
    )
    const candidates = response.items || []
    const matching = candidates.find((candidate) => {
      const candidateSlug = resolveLocalizedValue(candidate.fields?.slug)
      const candidateTitle = resolveLocalizedValue(candidate.fields?.title)
      return normalizeSlug(candidateSlug || candidateTitle) === normalizedSlug
    })
    if (matching) {
      item = matching
      includeMap = buildIncludeMap(response.includes)
    }
  }

  if (item) {
    includeMap = await ensureResolvedAssets(item, includeMap)
  }

  return item ? mapContentfulEntryToPost(item, includeMap) : null
}

export const isCmsEnabled = () => isConfigured
