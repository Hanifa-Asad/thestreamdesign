// ─── EmailJS Configuration ───────────────────────────────────────────────────
// Your PUBLIC_KEY is already set below.
// Log into https://dashboard.emailjs.com and grab your SERVICE_ID + TEMPLATE_ID

export const EMAILJS_CONFIG = {
  SERVICE_ID:  'service_9zbig2h',    // ← replace with e.g. 'service_abc123'
  TEMPLATE_ID: 'template_3scspzb',   // ← replace with e.g. 'template_xyz789'
  PUBLIC_KEY:  '9Auv9YtYqEKM2VH-Q',  // ✅ your key
}

// ⚠️ IMPORTANT: Your EmailJS template MUST contain these exact variables:
//   {{from_name}}     - Sender's name
//   {{from_email}}    - Sender's email address  
//   {{to_email}}      - Recipient email (where the message will be sent)
//   {{service}}       - Service type selected
//   {{message}}       - The message content
//
// If template variables don't match, the form will return 422 error.
// Verify your template at: https://dashboard.emailjs.com/admin/templates

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
  email:    'hello@thestreamdesign.com',
  whatsapp: '+1 (000) 000-0000',
  location: 'Remote Worldwide',
}
