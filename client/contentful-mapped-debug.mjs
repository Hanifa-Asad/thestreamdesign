import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envRaw = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf8');
const env = envRaw.split(/\r?\n/).reduce((acc, line) => {
  const m = line.match(/^(\w+)=(.*)$/);
  if (m) acc[m[1]] = m[2];
  return acc;
}, {});

const spaceId = env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = env.VITE_CONTENTFUL_ACCESS_TOKEN;
const environment = env.VITE_CONTENTFUL_ENVIRONMENT || 'master';
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?content_type=blogPost&fields.slug=pro-gaming-stream-setup-2026&limit=1&include=2`;

const res = await fetch(`${url}&access_token=${accessToken}`);
const data = await res.json();
console.log('entry response:', JSON.stringify(data, null, 2));

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

const resolveLocalizedValue = (value) => {
  if (value == null) return value
  if (Array.isArray(value)) return value
  if (typeof value !== 'object') return value

  const localeKeys = Object.keys(value).filter((key) => /^[a-z]{2}(-[A-Z]{2})?$/.test(key))
  if (localeKeys.length > 0) {
    const localeValues = localeKeys.map((key) => value[key]).filter((v) => v !== undefined && v !== null)
    return localeValues.length ? localeValues[0] : null
  }

  return value
}

const isLinkObject = (value) => value && value.sys && value.sys.type === 'Link'

const resolveLinkValue = (value, includeMap = {}) => {
  const resolved = resolveLocalizedValue(value)
  if (!resolved) return resolved

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

const includeMap = buildIncludeMap(data.includes)
const entry = data.items?.[0]
const imageUrl = resolveAssetUrl(entry?.fields?.image, includeMap)
console.log('resolved imageUrl:', imageUrl)
