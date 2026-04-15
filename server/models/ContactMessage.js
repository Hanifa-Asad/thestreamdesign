import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    service: {
      type: String,
      required: [true, 'Service selection is required'],
      enum: [
        'Logo Design',
        'Stream Banners',
        'Stream Overlays',
        'Twitch Emotes',
        'Logo & Banner (YouTube)',
        'Thumbnail Design',
        'Reels Thumbnails',
        'Video Editing',
        'Reels Editing',
        'YouTube Management',
        'Channel Management',
        'Other',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
)

export default mongoose.model('ContactMessage', contactMessageSchema)
