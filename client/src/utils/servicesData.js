// ─── TheStreamDesign — Services Data ───────────────────────────────────────
// Central source of truth. Used by Services page, ServiceDetail, Pricing, Navbar.

import {
  Gamepad2, Layers, Monitor, Smile,
  Youtube, Image, Film, Video, Scissors, Settings, BarChart3,
} from 'lucide-react'

export const SERVICE_CATEGORIES = {
  GAMERS_STREAMERS: 'gamers-streamers',
  YOUTUBERS: 'youtubers',
}

export const SERVICES = [
  // ── Gamers & Streamers ────────────────────────────────────────────────────
  {
    id: 'logo-design-gamer',
    slug: 'logo-design',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Gamepad2,
    title: 'Logo Design',
    tagline: 'A mark that dominates every arena',
    description:
      'Custom gaming logos crafted to represent your unique identity across Twitch, Discord, and every platform you dominate.',
    features: [
      'Fully custom concept from scratch',
      'Transparent PNG & vector SVG files',
      'Multiple color variations (dark/light)',
      'Social media ready sizes',
      'Unlimited revisions on Premium',
      'Commercial usage rights included',
    ],
    deliverables: ['PNG (transparent)', 'SVG', 'PSD/AI source file', 'Brand guidelines PDF'],
    turnaround: '3–5 business days',
    placeholder: '/images/placeholder-logo.jpg',
  },
  {
    id: 'stream-banners',
    slug: 'stream-banners',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Layers,
    title: 'Stream Banners',
    tagline: 'First impressions that convert visitors to followers',
    description:
      'Eye-catching Twitch/YouTube channel banners and profile headers designed to make your channel stand out in a crowded space.',
    features: [
      'Twitch banner (1920×480px)',
      'YouTube channel art (2560×1440px)',
      'Twitter/X header (1500×500px)',
      'Social media kit included on Premium',
      'Matches your brand color palette',
      'High-resolution export',
    ],
    deliverables: ['PNG exports at all required sizes', 'PSD source file'],
    turnaround: '2–4 business days',
    placeholder: '/images/placeholder-banner.jpg',
  },
  {
    id: 'stream-overlays',
    slug: 'stream-overlays',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Monitor,
    title: 'Stream Overlays',
    tagline: 'Professional HUD for your live broadcast',
    description:
      'Fully animated, OBS-ready stream overlay packages including alerts, panels, transitions, and screens — built to keep viewers hooked.',
    features: [
      'Starting / BRB / Ending screens',
      'Animated webcam frame',
      'Alert animations (follow, sub, donation)',
      'Chat & event list overlays',
      'Scene transition screens',
      'OBS & Streamlabs compatible',
    ],
    deliverables: ['OBS Scene Collection file', 'PNG assets', 'Setup guide PDF'],
    turnaround: '5–7 business days',
    placeholder: '/images/placeholder-overlay.jpg',
  },
  {
    id: 'twitch-emotes',
    slug: 'twitch-emotes',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Smile,
    title: 'Twitch Emotes',
    tagline: 'Give your community a language of their own',
    description:
      'Custom Twitch emotes, badges, and panels that make your community feel exclusive and build subscriber loyalty.',
    features: [
      'Custom emote design (up to 5)',
      'All Twitch required sizes (28/56/112px)',
      'Sub badges (up to 6 levels)',
      'Channel point icons',
      'Transparent background',
      'Unlimited revisions on Premium',
    ],
    deliverables: ['PNG at all Twitch sizes', 'Original PSD files'],
    turnaround: '3–5 business days',
    placeholder: '/images/placeholder-emote.jpg',
  },

  // ── YouTubers ─────────────────────────────────────────────────────────────
  {
    id: 'logo-banner-youtube',
    slug: 'logo-banner-youtube',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Youtube,
    title: 'Logo & Banner',
    tagline: 'Build a channel brand people remember',
    description:
      'Complete YouTube channel branding — logo design and banner art crafted to attract subscribers from first glance.',
    features: [
      'Custom logo (all variations)',
      'YouTube channel banner (2560×1440px)',
      'Watermark for video use',
      'Profile picture optimized',
      'Matching color palette',
      'Full brand kit on Premium',
    ],
    deliverables: ['PNG, SVG, PSD/AI files', 'YouTube-sized exports'],
    turnaround: '4–6 business days',
    placeholder: '/images/placeholder-yt-brand.jpg',
  },
  {
    id: 'thumbnail-design',
    slug: 'thumbnail-design',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Image,
    title: 'Thumbnail Design',
    tagline: 'Thumbnails that demand the click',
    description:
      'High-CTR YouTube thumbnails with bold typography, vibrant colors, and professional composition — designed to maximize click-through rates.',
    features: [
      '1280×720px optimized resolution',
      'Bold attention-grabbing text overlay',
      'Custom background/scene composition',
      'Face cutout & retouching',
      'A/B variant on Premium',
      'Fast 24hr turnaround on Standard+',
    ],
    deliverables: ['PNG 1280×720px', 'PSD source file'],
    turnaround: '1–2 business days',
    placeholder: '/images/placeholder-thumbnail.jpg',
  },
  {
    id: 'reels-thumbnails',
    slug: 'reels-thumbnails',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Film,
    title: 'Reels Thumbnails',
    tagline: 'Stop the scroll on every platform',
    description:
      'Custom Instagram Reels, YouTube Shorts, and TikTok cover thumbnails designed for vertical format with maximum visual impact.',
    features: [
      'Vertical format (1080×1920px)',
      'Platform-specific sizing',
      'Eye-catching color grading',
      'Text & logo overlay',
      'Batch discounts on Premium',
    ],
    deliverables: ['PNG at all platform sizes', 'PSD source file'],
    turnaround: '1–2 business days',
    placeholder: '/images/placeholder-reels.jpg',
  },
  {
    id: 'video-editing',
    slug: 'video-editing',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Video,
    title: 'Video Editing',
    tagline: 'Edits that keep viewers watching till the end',
    description:
      'Professional YouTube video editing with cuts, color grading, motion graphics, captions, and sound design to maximize watch time.',
    features: [
      'Jump cuts & pacing optimization',
      'Color correction & grading',
      'Custom intro/outro animation',
      'Captions & subtitles',
      'Background music & SFX',
      'Thumbnail included on Premium',
    ],
    deliverables: ['Final MP4 (1080p or 4K)', 'Project file on Premium'],
    turnaround: '3–5 business days per video',
    placeholder: '/images/placeholder-video-edit.jpg',
  },
  {
    id: 'reels-editing',
    slug: 'reels-editing',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Scissors,
    title: 'Reels Editing',
    tagline: 'Viral-ready short-form content',
    description:
      'Fast-paced Instagram Reels, YouTube Shorts, and TikTok edits with trending transitions, text hooks, and trending audio sync.',
    features: [
      'Trending transitions & effects',
      'Auto-sync to beat/audio',
      'Text hooks & captions',
      'Vertical 9:16 format',
      'Up to 60 seconds',
      'Bulk package on Premium',
    ],
    deliverables: ['MP4 vertical format', 'Platform-ready export'],
    turnaround: '1–3 business days',
    placeholder: '/images/placeholder-reels-edit.jpg',
  },
  {
    id: 'youtube-management',
    slug: 'youtube-management',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Settings,
    title: 'YouTube Management',
    tagline: 'Grow while you focus on content',
    description:
      'End-to-end YouTube channel management — SEO optimization, titles, descriptions, tags, scheduling, and community management.',
    features: [
      'SEO-optimized titles & descriptions',
      'Tag research & optimization',
      'Thumbnail A/B testing',
      'Upload scheduling',
      'Community post management',
      'Monthly analytics report',
    ],
    deliverables: ['Monthly performance report', 'SEO audit'],
    turnaround: 'Ongoing monthly service',
    placeholder: '/images/placeholder-yt-mgmt.jpg',
  },
  {
    id: 'channel-management',
    slug: 'channel-management',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: BarChart3,
    title: 'Channel Management',
    tagline: 'Full-service growth partner',
    description:
      'Complete channel management including content strategy, posting schedule, branding consistency, sponsor outreach, and growth analytics.',
    features: [
      'Content calendar & strategy',
      'Full upload management',
      'Sponsor outreach assistance',
      'Audience engagement',
      'Competitor analysis',
      'Weekly growth reporting',
    ],
    deliverables: ['Strategy deck', 'Weekly reports', 'Growth roadmap'],
    turnaround: 'Ongoing monthly service',
    placeholder: '/images/placeholder-ch-mgmt.jpg',
  },
]

export const getServiceBySlug = (slug) => SERVICES.find(s => s.slug === slug)
export const getServicesByCategory = (category) => SERVICES.filter(s => s.category === category)
