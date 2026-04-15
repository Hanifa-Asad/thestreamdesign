import nodemailer from 'nodemailer'
import ContactMessage from '../models/ContactMessage.js'

// ─── Nodemailer Transporter ──────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

// ─── POST /api/contact ────────────────────────────────────────────────────────
export const submitContact = async (req, res) => {
  try {
    const { name, email, service, message } = req.body

    // 1. Save to MongoDB
    const contact = await ContactMessage.create({
      name,
      email,
      service,
      message,
      ipAddress: req.ip,
    })

    // 2. Send notification email via Gmail
    try {
      const transporter = createTransporter()

      // Notification to agency
      await transporter.sendMail({
        from: `"TheStreamDesign Bot" <${process.env.GMAIL_USER}>`,
        to: process.env.MAIL_TO,
        subject: `🎮 New Contact: ${service} — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #000; padding: 20px; border-left: 4px solid #2cff05;">
              <h2 style="color: #2cff05; margin: 0;">New Project Inquiry</h2>
            </div>
            <div style="background: #111; padding: 24px; color: #fff;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #888; padding: 8px 0; width: 120px;">Name</td>
                  <td style="color: #fff; padding: 8px 0;"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td style="color: #888; padding: 8px 0;">Email</td>
                  <td style="color: #2cff05; padding: 8px 0;">${email}</td>
                </tr>
                <tr>
                  <td style="color: #888; padding: 8px 0;">Service</td>
                  <td style="color: #fff; padding: 8px 0;">${service}</td>
                </tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background: #1a1a1a; border-radius: 6px;">
                <p style="color: #888; margin: 0 0 8px; font-size: 12px;">MESSAGE</p>
                <p style="color: #fff; margin: 0; white-space: pre-line;">${message}</p>
              </div>
            </div>
          </div>
        `,
      })

      // Auto-reply to client
      await transporter.sendMail({
        from: `"TheStreamDesign" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `✅ We received your inquiry — TheStreamDesign`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #000; padding: 20px; border-left: 4px solid #2cff05;">
              <h2 style="color: #2cff05; margin: 0;">TheStreamDesign</h2>
              <p style="color: #888; margin: 4px 0 0; font-size: 14px;">Level Up Your Brand</p>
            </div>
            <div style="background: #111; padding: 24px; color: #fff;">
              <p>Hey <strong>${name}</strong>,</p>
              <p>Thanks for reaching out! We've received your inquiry about <strong style="color: #2cff05;">${service}</strong> and will get back to you within <strong>24–48 hours</strong>.</p>
              <p style="color: #888;">In the meantime, check out our portfolio and pricing at <a href="${process.env.CLIENT_URL}" style="color: #2cff05;">thestreamdesign.com</a></p>
              <p>Talk soon,<br><strong>The TheStreamDesign Team</strong></p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      // Email failure shouldn't break the API response — log it but continue
      console.error('Email sending failed:', emailError.message)
    }

    res.status(201).json({
      success: true,
      message: 'Message received! We\'ll get back to you within 24–48 hours.',
      id: contact._id,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message)
      return res.status(400).json({ success: false, message: errors[0] })
    }
    console.error('Contact submit error:', error)
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}

// ─── GET /api/contact (admin — for future dashboard use) ────────────────────
export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 })
    res.json({ success: true, count: contacts.length, data: contacts })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
