// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────────────────────────────────────
//
// HOW TO FIND YOUR IDs:
//   1. Go to https://dashboard.emailjs.com
//   2. Email Services  → click your Gmail service → copy the Service ID
//      e.g.  'service_abc1234'
//   3. Email Templates → click your template    → copy the Template ID
//      e.g.  'template_xyz9876'
//   4. Account → API Keys → Public Key  (already set below ✅)
//
// Your EmailJS template MUST contain these exact variable names:
//   {{from_name}}   {{from_email}}   {{service}}   {{message}}   {{to_name}}
//
// ─────────────────────────────────────────────────────────────────────────────

export const EMAILJS_CONFIG = {
 SERVICE_ID:  'service_j0c2poi',    // ← replace with e.g. 'service_abc123'
  TEMPLATE_ID: 'template_3scspzb',   // ← replace with e.g. 'template_xyz789'
  PUBLIC_KEY:  '9Auv9YtYqEKM2VH-Q',  // ✅ your key
}

// Quick check helper — called on app start in Contact.jsx
export function validateEmailJSConfig() {
  const missing = []
  if (EMAILJS_CONFIG.SERVICE_ID  === 'YOUR_SERVICE_ID')  missing.push('SERVICE_ID')
  if (EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') missing.push('TEMPLATE_ID')
  if (missing.length) {
    console.warn(
      `[EmailJS] ⚠️  Missing config: ${missing.join(', ')}.\n` +
      `  Open src/utils/emailConfig.js and set your real IDs.\n` +
      `  Dashboard: https://dashboard.emailjs.com`
    )
    return false
  }
  return true
}

// ─── Social links ─── replace '#' with real URLs
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/thestreamingdesigns/',
  threads:   'https://www.threads.com/@thestreamingdesigns',
  facebook:  'https://www.facebook.com/TheStreamingDesign',
  tiktok:    'https://www.tiktok.com/@thestreamingdesign',
  twitter:   'https://x.com/streamingdesign',
  linkedin:  'https://www.linkedin.com/company/thestreamingdesign',
  trustpilot:'https://www.trustpilot.com/review/thestreamingdesign.com',
  youtube:   'https://www.youtube.com/@TheStreamingDesign',
  kick:      'https://kick.com/thestreamingdesign',
  twitch:    'https://www.twitch.tv/thestreamingdesign',
  patreon:   'https://patreon.com/TheStreamingDesign',
  behance:   'https://www.behance.net/streamingdesign',
  dribbble:  'https://dribbble.com/streaming-design',
  pinterest: 'https://www.pinterest.com/thestreamingdesign/',
}

export const CONTACT_INFO = {
  email: 'info@thestreamingdesign.com',
  phone: '+1 346 857 1259',
  location: 'Remote Worldwide',
}
