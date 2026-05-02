// ─── Blog / Posts Data ───────────────────────────────────────────────────────
// Dummy data — swap for API calls when backend is ready.
// Structure is designed to be backend-compatible (matches typical MongoDB doc shape).

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

export const BLOG_POSTS = [
  {
    id: 'how-to-grow-twitch-channel-2024',
    slug: 'how-to-grow-twitch-channel-2024',
    title: 'How to Grow Your Twitch Channel in 2024: The Complete Streamer Guide',
    excerpt: 'From zero to affiliate in 90 days — we break down the exact strategies top streamers use to build audiences fast, including branding, consistency, and community tactics.',
    category: 'Streaming Tips',
    tag: 'Twitch',
    tagColor: '#a855f7',
    readTime: '8 min read',
    date: 'Dec 15, 2024',
    gradient: 'from-purple-900 to-black',
    coverBg: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(168,85,247,0.35) 0%, transparent 70%)',
    content: [
      {
        type: 'intro',
        text: 'Growing a Twitch channel in 2024 is simultaneously easier and harder than ever. Easier because the tools, discoverability features, and creator economy infrastructure are more mature. Harder because competition is fierce — there are over 7 million channels streaming monthly. This guide cuts through the noise.',
      },
      {
        type: 'heading',
        text: '1. Your Brand Is Your First Impression',
      },
      {
        type: 'text',
        text: 'Before you go live for your first stream, your channel needs to look professional. Viewers make snap judgments in under 3 seconds. A clean logo, a consistent color palette, and a cohesive overlay package signal that you take this seriously — and that earns trust and follows before you\'ve said a word.',
      },
      {
        type: 'text',
        text: 'Your brand should answer: What do you play? What is your personality? What feeling should viewers get? Once you have those answers, every design decision — colors, fonts, overlay style — should reinforce them consistently.',
      },
      {
        type: 'heading',
        text: '2. Consistency Beats Talent Every Time',
      },
      {
        type: 'text',
        text: 'The streamers who grow aren\'t always the most skilled players. They\'re the ones who show up on a consistent schedule, week after week. Pick 3–4 days and stream at the same time. Your audience will build habits around your schedule. Miss streams and they build habits around someone else.',
      },
      {
        type: 'heading',
        text: '3. Optimize Your Titles and Categories',
      },
      {
        type: 'text',
        text: 'Twitch discovery happens through categories and search. Stream in less-saturated game categories during off-peak hours to appear near the top. Use titles with keywords people might search — be specific, not generic. "Playing ranked FPS" loses to "Road to Radiant — Iron to Diamond Run Day 12".',
      },
      {
        type: 'heading',
        text: '4. Clips Are Your Free Marketing',
      },
      {
        type: 'text',
        text: 'Your best moments don\'t have to die when the stream ends. Create clips of highlights, funny moments, or impressive plays. Post them to TikTok, YouTube Shorts, and Instagram Reels. Each clip is a funnel leading potential viewers back to your channel. The streamers growing fastest in 2024 are the ones treating short-form content as their primary growth engine.',
      },
      {
        type: 'heading',
        text: '5. Build Community, Not Just Views',
      },
      {
        type: 'text',
        text: 'A Discord server with 50 highly engaged members is worth more than 500 passive viewers. Create a space for your community outside of streams. Run events, polls, game nights. People who feel part of a community become your most loyal supporters — they gift subs, bring friends, and stick around through rough patches.',
      },
    ],
  },
  {
    id: 'youtube-thumbnail-design-ctr',
    slug: 'youtube-thumbnail-design-ctr',
    title: '7 Thumbnail Design Rules That Doubled Our Clients\' CTR',
    excerpt: 'Click-through rate is the most important metric on YouTube. We analyzed 200+ thumbnails across gaming channels and found 7 design patterns that consistently outperform generic thumbnails.',
    category: 'Design Tips',
    tag: 'YouTube',
    tagColor: '#ef4444',
    readTime: '6 min read',
    date: 'Dec 8, 2024',
    gradient: 'from-red-900 to-black',
    coverBg: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(239,68,68,0.35) 0%, transparent 70%)',
    content: [
      {
        type: 'intro',
        text: 'YouTube is a thumbnail-first platform. Before anyone watches your video, they judge your thumbnail. In a sea of content, your thumbnail has roughly 1.5 seconds to earn a click. Here are the 7 rules our design team uses to consistently produce high-performing thumbnails.',
      },
      {
        type: 'heading',
        text: 'Rule 1: Emotion Over Information',
      },
      {
        type: 'text',
        text: 'The most clicked thumbnails feature strong facial expressions — shock, excitement, laughter, fear. The human brain is hardwired to notice and respond to faces. If you\'re a facecam creator, your face in the thumbnail dramatically improves CTR. Make the expression 10x more intense than you\'d normally be comfortable with.',
      },
      {
        type: 'heading',
        text: 'Rule 2: 3-Element Composition',
      },
      {
        type: 'text',
        text: 'The best thumbnails contain exactly three visual elements: (1) a focal point — usually your face or a key game moment, (2) a background — simplified, not cluttered, (3) a text overlay — maximum 4 words, large and legible. More than three elements creates visual noise. Less than two feels empty.',
      },
      {
        type: 'heading',
        text: 'Rule 3: Contrast Is Non-Negotiable',
      },
      {
        type: 'text',
        text: 'Your thumbnail will appear at 120x68px on mobile. At that size, low contrast thumbnails become unreadable blobs. Use colors that pop against each other — dark text on bright backgrounds, bright text on dark ones. Test your thumbnail at thumbnail size before publishing.',
      },
      {
        type: 'heading',
        text: 'Rule 4: Brand Consistency',
      },
      {
        type: 'text',
        text: 'Your thumbnails should form a recognizable visual language. Use a consistent color palette, text style, and layout across all videos. When viewers recognize your thumbnail style in browse view, click-through rates increase by up to 40% because familiar channels feel safer to click on.',
      },
    ],
  },
  {
    id: 'stream-overlay-setup-guide',
    slug: 'stream-overlay-setup-guide',
    title: 'The Ultimate Stream Overlay Setup Guide for OBS and Streamlabs',
    excerpt: 'Installing and configuring a stream overlay package doesn\'t have to be complicated. This step-by-step guide covers everything from importing scenes to customizing alert animations.',
    category: 'Tutorials',
    tag: 'Overlays',
    tagColor: '#00cc00',
    readTime: '10 min read',
    date: 'Nov 28, 2024',
    gradient: 'from-green-900 to-black',
    coverBg: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(44,255,5,0.3) 0%, transparent 70%)',
    content: [
      {
        type: 'intro',
        text: 'You\'ve invested in a premium stream overlay package. Now what? Getting everything set up correctly in OBS or Streamlabs can feel overwhelming if you\'ve never done it before. This guide walks you through the entire process step by step.',
      },
      {
        type: 'heading',
        text: 'Step 1: Unpack Your Overlay Package',
      },
      {
        type: 'text',
        text: 'Most professional overlay packages ship as a ZIP file containing: a Scene Collection JSON file, PNG/GIF assets for each element, an alerts folder with animation files, and a setup guide PDF. Extract everything to a dedicated folder — somewhere permanent, not your Downloads folder, since OBS references these files by path.',
      },
      {
        type: 'heading',
        text: 'Step 2: Import the Scene Collection (OBS)',
      },
      {
        type: 'text',
        text: 'Open OBS Studio. Go to Scene Collection → Import. Navigate to the JSON file in your overlay folder. OBS will import all scenes, sources, and settings. You\'ll see scenes like "Starting Soon", "Live", "BRB", and "Ending" appear in your Scene list.',
      },
      {
        type: 'heading',
        text: 'Step 3: Set Up Browser Sources for Alerts',
      },
      {
        type: 'text',
        text: 'Alerts (for follows, subs, donations) are typically delivered as browser source URLs from Streamlabs or StreamElements. Copy your alert widget URL from your alert platform, add a Browser Source to your Live scene, paste the URL, and set dimensions to 1920x1080. The alerts will fire as overlays on top of your gameplay.',
      },
      {
        type: 'heading',
        text: 'Step 4: Customize Colors and Text',
      },
      {
        type: 'text',
        text: 'Most high-quality overlay packages include a customization guide. For OBS packages, you\'ll update text sources directly in the source properties. For Streamlabs widget packs, you\'ll use the visual editor in your dashboard to change colors, fonts, and animation styles to match your brand.',
      },
    ],
  },
  {
    id: 'gaming-logo-design-principles',
    slug: 'gaming-logo-design-principles',
    title: 'What Makes a Great Gaming Logo: Design Principles for Creators',
    excerpt: 'A gaming logo is more than an icon — it\'s your identity across Twitch, YouTube, merchandise, and social media. We break down the design principles behind logos that actually work.',
    category: 'Design Tips',
    tag: 'Branding',
    tagColor: '#f59e0b',
    readTime: '7 min read',
    date: 'Nov 20, 2024',
    gradient: 'from-yellow-900 to-black',
    coverBg: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(245,158,11,0.3) 0%, transparent 70%)',
    content: [
      {
        type: 'intro',
        text: 'Your logo is the most versatile and permanent part of your brand. It will appear on overlays, channel art, merchandise, social media profiles, and potentially esports jerseys. Getting it right from the start saves you a costly rebrand down the line.',
      },
      {
        type: 'heading',
        text: 'Principle 1: Simplicity Scales',
      },
      {
        type: 'text',
        text: 'A logo that looks great at 500px needs to still read clearly at 28px (Twitch subscriber badge size). Complex logos with intricate detail fail this test. The most iconic gaming logos — think classic esports teams — are simple shapes that are instantly recognizable at any size.',
      },
      {
        type: 'heading',
        text: 'Principle 2: One Primary Color Maximum',
      },
      {
        type: 'text',
        text: 'Multi-color logos look impressive in isolation but become liabilities when placed on different backgrounds — overlays, channel panels, Discord avatars. Design your logo to work in a single color first. If it works in one color, it works everywhere. Color should be a bonus, not a requirement.',
      },
      {
        type: 'heading',
        text: 'Principle 3: Match Your Content Niche',
      },
      {
        type: 'text',
        text: 'An FPS streamer and a cozy game streamer should have very different logo aesthetics. Your logo should immediately communicate your content genre. Sharp geometric shapes and aggressive angles suit competitive gaming. Rounded, organic forms suit lifestyle and casual creators. Don\'t design a logo that could belong to any streamer — design one that could only belong to you.',
      },
    ],
  },
  {
    id: 'twitch-emotes-community-guide',
    slug: 'twitch-emotes-community-guide',
    title: 'Twitch Emotes 101: How to Build Emotes That Your Community Actually Uses',
    excerpt: 'Sub badges and channel emotes are your community\'s language. We explain what makes emotes shareable, culturally relevant, and worth subscribing for.',
    category: 'Community',
    tag: 'Twitch',
    tagColor: '#a855f7',
    readTime: '5 min read',
    date: 'Nov 12, 2024',
    gradient: 'from-purple-900 via-indigo-900 to-black',
    coverBg: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(168,85,247,0.3) 0%, transparent 70%)',
    content: [
      {
        type: 'intro',
        text: 'Twitch emotes are a unique cultural phenomenon. They start as private channel assets and can evolve into global internet shorthand. Think of the origin of PogChamp, FeelsBadMan, or any of the emotes that migrated from BTTV into mainstream internet culture. Great emotes build community and give subscribers a reason to stay.',
      },
      {
        type: 'heading',
        text: 'What Makes an Emote Actually Get Used?',
      },
      {
        type: 'text',
        text: 'Emotes that get used in chat serve a specific emotional or communicative function. They express something that text alone cannot — a specific type of hype, a specific type of sadness, an in-joke from a famous stream moment. Before designing emotes, ask: what specific emotions or moments does my community need to express?',
      },
      {
        type: 'heading',
        text: 'The Three Emote Categories Every Channel Needs',
      },
      {
        type: 'text',
        text: 'Every channel\'s emote set should cover three bases: (1) Hype — a high-energy celebratory emote for clip-worthy moments; (2) Laughter — a funny or meme-worthy face for comedic moments; (3) Identity — something specific to your channel\'s lore, inside jokes, or catchphrases that outsiders won\'t understand.',
      },
    ],
  },
  {
    id: 'youtube-channel-management-tips',
    slug: 'youtube-channel-management-tips',
    title: 'YouTube Channel Management in 2024: What Actually Moves the Needle',
    excerpt: 'Posting consistently is not enough. Channel management in 2024 means SEO-optimized metadata, strategic publishing times, A/B testing thumbnails, and understanding your analytics.',
    category: 'YouTube Growth',
    tag: 'YouTube',
    tagColor: '#ef4444',
    readTime: '9 min read',
    date: 'Nov 5, 2024',
    gradient: 'from-red-900 via-orange-900 to-black',
    coverBg: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(239,68,68,0.3) 0%, transparent 70%)',
    content: [
      {
        type: 'intro',
        text: 'Most gaming YouTubers plateau at a few thousand subscribers and can\'t figure out why. They\'re posting regularly, their content is good, but growth has stalled. In most cases, the problem isn\'t the content — it\'s the channel management strategy around the content.',
      },
      {
        type: 'heading',
        text: 'SEO Starts in the Title',
      },
      {
        type: 'text',
        text: 'YouTube is the second largest search engine in the world. People search for gaming content — walkthroughs, tier lists, builds, reviews. Your title needs to contain the exact phrase people are typing. Use YouTube\'s autocomplete as free keyword research. Type your game name and see what YouTube suggests — those are searches people are already making.',
      },
      {
        type: 'heading',
        text: 'The First 24 Hours Are Critical',
      },
      {
        type: 'text',
        text: 'YouTube\'s algorithm judges new videos on their performance in the first 24–48 hours. This is when it shows your video to a test audience and measures CTR and watch time. Maximize this window by posting when your audience is most active, promoting the video immediately on all channels, and engaging with every comment in the first few hours.',
      },
      {
        type: 'heading',
        text: 'A/B Test Your Thumbnails',
      },
      {
        type: 'text',
        text: 'YouTube Studio allows you to A/B test thumbnails. Use this feature ruthlessly. Run two very different thumbnail designs against each other for 48 hours, then keep the winner. Over time, you\'ll develop an intuition for what your specific audience responds to — and your CTR will compound upward.',
      },
    ],
  },
]

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
