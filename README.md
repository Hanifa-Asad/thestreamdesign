# thestreamingdesign 🎮

Premium gaming & digital services agency website — MERN Stack.

## Tech Stack

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | React 18, React Router v6, Tailwind CSS, Framer Motion |
| Backend   | Node.js, Express, MongoDB (Mongoose)          |
| Email     | EmailJS (primary) + Nodemailer (backup)       |
| Fonts     | Orbitron, Rajdhani, Share Tech Mono (Google)  |

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourname/thestreamingdesign.git
cd thestreamingdesign
npm run install-all
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
# Fill in MONGO_URI, GMAIL credentials, etc.
```

### 3. Configure EmailJS (Frontend)

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create a Gmail service + email template
3. Open `client/src/utils/emailConfig.js`
4. Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY`

### 4. Run Development

```bash
# From project root — runs both client (port 3000) and server (port 5000)
npm run dev
```

### 5. Contentful CMS Setup

1. Sign up at https://www.contentful.com and create a new space.
2. Add a `blogPost` content type with fields: `title`, `slug`, `excerpt`, `category`, `tag`, `tagColor`, `date`, `readTime`, `gradient`, `coverBg`, and `body`.
3. Publish at least one blog entry.
4. Copy the Space ID and Content Delivery API token.
5. In `client/.env`, set:

```bash
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_token
VITE_CONTENTFUL_ENVIRONMENT=master
VITE_CONTENTFUL_BLOG_CONTENT_TYPE=blogPost
```

6. Restart the client dev server.

---

## Project Structure

```
thestreamingdesign/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/             # Home, About, Services, Pricing, Portfolio, Contact
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer, Layout
│   │   │   ├── ui/            # GlowButton, SectionWrapper, ParticleBackground
│   │   │   └── sections/      # HeroSection, ServicesSection, TestimonialsSection…
│   │   ├── hooks/             # useScrollAnimation
│   │   ├── utils/             # servicesData.js, emailConfig.js
│   │   └── assets/            # images, icons
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                    # Express backend
    ├── config/db.js           # MongoDB connection
    ├── models/ContactMessage.js
    ├── controllers/contactController.js
    ├── routes/contact.js
    └── index.js               # Entry point
```

---

## Deployment

### Frontend (Vercel / Netlify)
```bash
cd client && npm run build
# Deploy the dist/ folder
```

### Backend (Railway / Render)
```bash
# Set environment variables in your hosting dashboard
# Start command: node index.js
```

---

## Services Included
**Gamers & Streamers:** Logo Design, Stream Banners, Stream Overlays, Twitch Emotes

**YouTubers:** Logo & Banner, Thumbnail Design, Reels Thumbnails, Video Editing, Reels Editing, YouTube Management, Channel Management
