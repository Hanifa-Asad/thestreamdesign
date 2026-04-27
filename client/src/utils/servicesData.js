// ─── thestreamingdesign — Services Data ───────────────────────────────────────
// Central source of truth. Used by Services page, ServiceDetail, Pricing, Navbar.

import {
  Gamepad2, Layers, Monitor, Smile,
  Youtube, Image, Film, Video, Scissors, Settings, BarChart3, Globe,
} from 'lucide-react'

export const SERVICE_CATEGORIES = {
  GAMERS_STREAMERS: 'gamers-streamers',
  YOUTUBERS: 'youtubers',
  DEVELOPMENT: 'development',
}

export const SERVICES = [
  // ── Gamers & Streamers ────────────────────────────────────────────────────
  {
    id: 'gaming-logo-esports-design',
    slug: 'gaming-logo-esports-design',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Gamepad2,
    title: 'Gaming Logo & Esports Design',
    tagline: 'An Identity as Fierce as Your Gameplay.',
    description:
      'Your logo is everything. Whether you&apos;re a solo streamer or an esports org, we design logos that get remembered.',
    features: [
      'Gaming logo design — custom, unique, yours',
      'Esports team logo & full identity',
      'Twitch mascot logo design',
      'Gaming mascot design — characters that represent your brand',
      'Esports logo design packages',
      'Streamer logo maker service — concept to final file',
    ],
    deliverables: ['Logo files', 'Brand identity guide', 'Mascot artwork', 'Source files'],
    turnaround: '4–6 business days',
    ctaText: 'Get My Logo',
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
    id: 'streaming-twitch-design',
    slug: 'streaming-twitch-design',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Monitor,
    title: 'Streaming & Twitch Design',
    tagline: 'Look Like a Pro on Stream.',
    description:
      'First impressions matter. Our twitch overlay design and stream branding services make sure your channel looks polished, professional, and 100% you.',
    features: [
      'Custom twitch overlay design & OBS overlay design',
      'Twitch alert package (follows, subs, donations)',
      'Twitch panels design for your channel page',
      'Streaming graphics design — screens, transitions, widgets',
      'Premade twitch overlays — instant, affordable, ready to go',
      'Streamer branding package — logo + overlay + alerts + panels',
    ],
    deliverables: ['OBS overlay files', 'Alert package', 'Panel set', 'Branding kit'],
    turnaround: '5–7 business days',
    ctaText: 'Get Your Overlay',
    placeholder: '/images/placeholder-overlay.jpg',
  },
  {
    id: 'twitch-channel-setup-optimization',
    slug: 'twitch-channel-setup-optimization',
    category: SERVICE_CATEGORIES.GAMERS_STREAMERS,
    icon: Gamepad2,
    title: 'Twitch Channel Setup & Optimization',
    tagline: 'Set Up Right. Grow Faster.',
    description:
      'Whether you&apos;re brand new or ready to level up, we set up and optimize your Twitch channel the right way from the start.',
    features: [
      'Twitch channel setup — panels, bio, overlays, alerts all configured',
      'Twitch channel optimization for search and discovery',
      'Twitch channel design — cohesive look across all elements',
      'Twitch channel management — ongoing support',
      'Twitch growth service — strategy to gain followers consistently',
      'How to get a custom twitch overlay — we guide and build it for you',
    ],
    deliverables: ['Channel setup', 'Optimization plan', 'Visual refresh', 'Ongoing support guide'],
    turnaround: '5–8 business days',
    ctaText: 'Set Up My Channel',
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
    id: 'video-editing-for-streamers',
    slug: 'video-editing-for-streamers',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Video,
    title: 'Video Editing for Streamers',
    tagline: 'Your Best Moments, Perfectly Edited.',
    description:
      'Raw footage doesn&apos;t grow channels — great edits do. Our team specializes in gaming video editing that keeps viewers watching.',
    features: [
      'YouTube video editor service (long-form & Shorts)',
      'Video editing for streamers — highlights, VODs, clips',
      'Best video editor for streamers — fast, clean, engaging cuts',
      'Branded intros, outros & transitions',
      'Thumbnail creation with every video',
      'Perfect for: Streamers who want to repurpose content and grow on YouTube.',
    ],
    deliverables: ['Edited video files', 'Shorts clips', 'Thumbnail asset', 'Project file on request'],
    turnaround: '3–5 business days per video',
    ctaText: 'Start Editing',
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
      'Free reel thumbnails included',
      'Up to 60 seconds',
    ],
    deliverables: ['MP4 vertical format', 'Free reel thumbnails', 'Platform-ready export'],
    turnaround: '1–3 business days',
    placeholder: '/images/placeholder-reels-edit.jpg',
  },
  {
    id: 'youtube-channel-management-growth',
    slug: 'youtube-channel-management-growth',
    category: SERVICE_CATEGORIES.YOUTUBERS,
    icon: Settings,
    title: 'YouTube Channel Management & Growth',
    tagline: 'Grow Your YouTube — Without the Guesswork.',
    description:
      'YouTube rewards consistency and strategy. We provide both.',
    features: [
      'YouTube channel management service for gamers',
      'YouTube SEO service — titles, tags, descriptions optimized',
      'YouTube channel audit and optimization service',
      'YouTube thumbnail and title optimization service',
      'YouTube content strategy — what to post, when to post, why',
      'YouTube channel growth strategy for streamers',
      'YouTube analytics and performance tracking service',
      'YouTube shorts editing for gamers',
    ],
    deliverables: ['Monthly strategy report', 'SEO audit', 'Content calendar', 'Performance tracking'],
    turnaround: 'Ongoing monthly service',
    ctaText: 'Grow My Channel',
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

  // ── Development ───────────────────────────────────────────────────────────
  {
    id: 'web-development',
    slug: 'web-development',
    category: SERVICE_CATEGORIES.DEVELOPMENT,
    icon: Globe,
    title: 'Web Development',
    tagline: 'Professional websites built for creators',
    description:
      'Custom-built, high-performance websites for gamers, streamers, and creators. From portfolio sites to community platforms, we create sites that convert visitors into fans.',
    features: [
      'Responsive design (mobile-first)',
      'Fast loading speeds & optimization',
      'SEO-friendly architecture',
      'Contact forms & email integration',
      'Social media integration',
      'Content management system (CMS)',
      'SSL security & backups included',
      'Hosting setup & configuration',
    ],
    deliverables: ['Fully deployed website', 'Source code', 'Setup & training guide', 'Admin documentation'],
    turnaround: '2–4 weeks',
    placeholder: '/images/placeholder-web-dev.jpg',
  },
]

export const PRICING_DATA = {
  'gaming-logo-esports-design': {
    label: 'Gaming Logo & Esports Design',
    tiers: [
      { name: 'Basic',    price: '$50',  delivery: '5 days',  revisions: '2',         features: ['1 logo concept', 'PNG export', '2 revisions', '5 day delivery'] },
      { name: 'Standard', price: '$100', delivery: '3 days',  revisions: 'Unlimited', features: ['3 logo concepts', 'PNG + SVG export', 'Unlimited revisions', '3 day delivery', 'Source files'] },
      { name: 'Premium',  price: '$150', delivery: '24 hrs',  revisions: 'Unlimited', features: ['5 logo concepts', 'All file formats', 'Unlimited revisions', '24h delivery', 'Source files', 'Brand guide'] },
    ],
  },
  'stream-banners': {
    label: 'Stream Banners',
    tiers: [
      { name: 'Basic',    price: '$30',  delivery: '4 days',  revisions: '2',         features: ['1 banner design', 'YouTube banner', 'PNG export', '2 revisions', '4 day delivery'] },
      { name: 'Standard', price: '$65',  delivery: '2 days',  revisions: 'Unlimited', features: ['3 banner designs', 'YouTube + Twitch banners', 'PNG + PSD export', 'Unlimited revisions', '2 day delivery', 'Source files'] },
      { name: 'Premium',  price: '$120', delivery: '24 hrs',  revisions: 'Unlimited', features: ['Full banner pack', 'All platforms covered', 'All file formats', 'Unlimited revisions', '24h delivery', 'Source files'] },
    ],
  },
  'streaming-twitch-design': {
    label: 'Streaming & Twitch Design',
    tiers: [
      { name: 'Basic',    price: '$75',  delivery: '3 days',  revisions: '2',         features: ['Static overlay package', 'Main gaming panel', 'PNG export', '2 revisions', '3 day delivery'] },
      { name: 'Standard', price: '$150', delivery: '1 week', revisions: 'Unlimited', features: ['Animated overlay package', 'Main gaming panel', 'Starting soon panel', 'Stream ending panel', 'Animated alerts', 'Source files included'] },
      { name: 'Premium',  price: '$300', delivery: '2-3 weeks', revisions: 'Unlimited', features: ['Full animated pack', 'Main gaming panel', 'Animated cam overlay', 'Starting soon + ending panels', 'Scene transitions', 'Custom emotes'] },
    ],
  },
  'twitch-emotes': {
    label: 'Twitch Emotes',
    tiers: [
      { name: 'Basic',    price: '$35',  delivery: '3 days',  revisions: '2',         features: ['3 custom static emotes', 'Twitch-ready sizing', 'PNG export (all sizes)', '2 revisions', '3 day delivery'] },
      { name: 'Standard', price: '$75',  delivery: '1 week', revisions: 'Unlimited', features: ['5 custom emotes', '3 static + 2 animated', 'Twitch + YouTube ready', 'PNG + GIF export', 'Source files included'] },
      { name: 'Premium',  price: '$150', delivery: '2-3 weeks', revisions: 'Unlimited', features: ['10 fully animated emotes', 'All platforms supported', 'PNG + GIF + APNG export', 'Sub badge set included', 'Commercial use rights'] },
    ],
  },
  'thumbnail-design': {
    label: 'Thumbnail Design',
    tiers: [
      { name: 'Basic',    price: '$15',  delivery: '3 days',  revisions: '2',         features: ['1 thumbnail design', '1920×1080 PNG export', 'Custom text & colors', '2 revisions'] },
      { name: 'Standard', price: '$35',  delivery: '2 days',  revisions: 'Unlimited', features: ['3 thumbnail designs', '1920×1080 PNG + PSD', 'Custom graphics & effects', 'Source files included'] },
      { name: 'Premium',  price: '$60',  delivery: '24 hrs',  revisions: 'Unlimited', features: ['5 thumbnail designs', 'All file formats', 'Advanced photo editing', 'Thumbnail style guide'] },
    ],
  },
  'video-editing-for-streamers': {
    label: 'Video Editing for Streamers',
    tiers: [
      { name: 'Basic',    price: '$80',  delivery: '4 days',  revisions: '2',         features: ['Up to 10 min video', 'Cuts & transitions', 'Background music', 'Basic color correction'] },
      { name: 'Standard', price: '$180', delivery: '3 days',  revisions: 'Unlimited', features: ['Up to 25 min video', 'Cuts, transitions & effects', 'Sound design & music', 'Color grading', 'Subtitles & captions'] },
      { name: 'Premium',  price: '$320', delivery: '24-48 hrs', revisions: 'Unlimited', features: ['Up to 60 min video', 'Advanced motion graphics', 'Custom intro & outro', 'Pro color grading', 'Sound design & mixing'] },
    ],
  },
  'reels-editing': {
    label: 'Reels Editing',
    tiers: [
      { name: 'Basic',    price: '$40',  delivery: '3 days',  revisions: '2',         features: ['Up to 60 sec reel', 'Cuts & transitions', 'Background music sync', 'Basic text & captions', '9:16 vertical export'] },
      { name: 'Standard', price: '$90',  delivery: '2 days',  revisions: 'Unlimited', features: ['3 reels bundle up to 90 sec', 'Trendy transitions & effects', 'Beat-synced music', 'Animated captions', '9:16 + 1:1 exports'] },
      { name: 'Premium',  price: '$160', delivery: '24 hrs',  revisions: 'Unlimited', features: ['5 reels up to 3 min', 'Advanced motion graphics', 'Custom animated text', 'Pro color grading', 'Sound design & mixing'] },
    ],
  },
  'twitch-channel-setup-optimization': {
    label: 'Twitch Channel Setup & Optimization',
    tiers: [
      { name: 'Basic',    price: '$120', delivery: '5 days',  revisions: '2',         features: ['Channel setup checklist', 'Panel + bio setup', 'Overlay installation guidance', 'Initial optimization review'] },
      { name: 'Standard', price: '$240', delivery: '1 week',  revisions: 'Unlimited', features: ['Full channel setup', 'SEO & discoverability optimization', 'Design refresh', 'Alert + panel config', 'Growth recommendations'] },
      { name: 'Premium',  price: '$420', delivery: '1-2 weeks', revisions: 'Unlimited', features: ['Ongoing channel optimization', 'Custom overlay install', 'Brand coherence across Twitch', 'Growth support plan', 'Priority turnaround'] },
    ],
  },
  'youtube-channel-management-growth': {
    label: 'YouTube Channel Management & Growth',
    tiers: [
      { name: 'Basic',    price: '$150', delivery: 'Monthly',  revisions: 'N/A',       features: ['Channel SEO optimization', '4 videos uploaded/month', 'Title & description writing', 'Tags & keywords research', 'Monthly analytics report'] },
      { name: 'Standard', price: '$300', delivery: 'Monthly',  revisions: 'N/A',       features: ['Full channel SEO', '8 videos uploaded/month', 'Title, description & tags', 'Thumbnail scheduling', 'Community management', 'Bi-weekly analytics report'] },
      { name: 'Premium',  price: '$500', delivery: 'Monthly',  revisions: 'N/A',       features: ['Complete channel management', 'Unlimited uploads/month', 'Full SEO & metadata', 'Comments & community management', 'Weekly analytics report', 'Dedicated account manager'] },
    ],
  },
  'web-development': {
    label: 'Web Development',
    tiers: [
      { name: 'Basic',    price: '$299', delivery: '7 days',   revisions: '2',         features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO setup'] },
      { name: 'Standard', price: '$599', delivery: '14 days',  revisions: 'Unlimited', features: ['Up to 10 pages', 'Responsive design', 'Full SEO optimization', 'Custom animations', 'Social media integration', 'Source files'] },
      { name: 'Premium',  price: '$999', delivery: '21 days',  revisions: 'Unlimited', features: ['Unlimited pages', 'Custom design & branding', 'E-commerce ready', 'Advanced SEO & analytics', 'Speed optimization', '1 month free support'] },
    ],
  },
}

export const getServiceBySlug = (slug) => SERVICES.find(s => s.slug === slug)
export const getServicesByCategory = (category) => SERVICES.filter(s => s.category === category)
