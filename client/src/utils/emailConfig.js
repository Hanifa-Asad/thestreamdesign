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
 SERVICE_ID:  'service_9zbig2h',    // ← replace with e.g. 'service_abc123'
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
  facebook:  '#',
  instagram: '#',
  twitter:   '#',
  tiktok:    '#',
  threads:   '#',
  discord:   '#',
  whatsapp:  '#',  // e.g. https://wa.me/923001234567
  youtube:   '#',
}

export const CONTACT_INFO = {
  email:    'hello@thestreamingdesign.com',
  whatsapp: '+1 (000) 000-0000',
  location: 'Remote Worldwide',
}
