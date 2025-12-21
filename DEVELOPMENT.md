# BandStage Pro - Development Guide

## 🚀 Quick Start

### 1. Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Copy from .env.example and fill in your values
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key
REACT_APP_SENDGRID_API_KEY=your_sendgrid_key
```

### 3. Supabase Setup

Follow the detailed instructions in `SUPABASE_SETUP.md`:
1. Create a Supabase project
2. Run the SQL schema
3. Add the connection details to `.env.local`

## 📁 Project Structure

```
/bandstage-pro-regensburg
├── public/                 # Static files
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/         # React components (to be created)
│   │   ├── Hero.jsx
│   │   ├── LevelFinder.jsx
│   │   ├── CoachingCards.jsx
│   │   ├── BookingForm.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       ├── BookingsList.jsx
│   │       └── AnalyticsPanel.jsx
│   ├── hooks/              # Custom React hooks (to be created)
│   │   ├── useBooking.js
│   │   ├── usePayment.js
│   │   └── useAuth.js
│   ├── services/           # ✅ Backend services (DONE)
│   │   ├── api.js          # Central API service
│   │   ├── supabase.js     # Database operations
│   │   ├── stripe.js       # Payment processing
│   │   └── sendgrid.js     # Email templates
│   ├── utils/              # ✅ Constants & helpers (DONE)
│   │   └── constants.js    # COACHING_LEVELS, QUIZ_QUESTIONS, etc.
│   ├── styles/             # ✅ Styling (DONE)
│   │   └── globals.css     # Tailwind + custom styles
│   ├── pages/              # Page components (to be created)
│   ├── index.js            # ✅ Entry point (DONE)
│   └── App.jsx             # ✅ Main component (DONE)
├── .env.example            # ✅ Environment template (DONE)
├── .gitignore              # ✅ Git ignore rules (DONE)
├── package.json            # ✅ Dependencies (DONE)
├── tailwind.config.js      # ✅ Tailwind config (DONE)
├── SUPABASE_SETUP.md       # ✅ Database setup guide (DONE)
└── README.md               # ✅ Project overview (DONE)
```

## 🎯 Current Status

### ✅ Phase 1: Backend Setup (COMPLETED)
- [x] Project structure created
- [x] Supabase database schema documented
- [x] Stripe integration prepared
- [x] SendGrid email templates created
- [x] API services implemented
- [x] Environment configuration
- [x] Tailwind CSS configured

### 🔄 Phase 2: Frontend Development (IN PROGRESS)

**Next Steps:**

1. **Install Dependencies** (Priority 1)
   ```bash
   npm install
   ```

2. **Create Core Components** (Priority 1)
   - [ ] `Hero.jsx` - Landing hero section with typewriter effect
   - [ ] `LevelFinder.jsx` - Quiz component for finding the right level
   - [ ] `CoachingCards.jsx` - Display 4 coaching levels
   - [ ] `BookingForm.jsx` - Multi-step booking form
   - [ ] `Footer.jsx` - Footer with contact info

3. **Implement Booking Flow** (Priority 1)
   - [ ] Create `useBooking.js` hook
   - [ ] Create `usePayment.js` hook
   - [ ] Integrate Stripe checkout
   - [ ] Add success/error pages

4. **Add Additional Features** (Priority 2)
   - [ ] `Testimonials.jsx` - Customer testimonials
   - [ ] `FAQ.jsx` - Accordion FAQ section
   - [ ] `Services.jsx` - Service packages teaser

5. **Admin Dashboard** (Priority 2)
   - [ ] Authentication flow
   - [ ] Dashboard overview
   - [ ] Bookings management
   - [ ] Analytics panel

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm start

# Build for production
npm build

# Run tests
npm test
```

## 🎨 Design System

### Colors
```javascript
Primary:  #FF6B35  // Orange
Accent:   #00D9FF  // Cyan
Success:  #4ADE80  // Green
Dark:     #0F0F1E  // Dark Blue/Black
```

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold (700-900)
- Body: Regular (400-500)

### Spacing
- Mobile-first approach
- Use Tailwind spacing utilities
- Minimum touch target: 44x44px

## 📋 Coaching Levels

All coaching levels are defined in `src/utils/constants.js`:

- **Rookie** (199€, 4h) - For beginners
- **Intermediate** (349€, 6h) - For bands with first gig experience
- **Advanced** (549€, 8h) - For ambitious bands
- **Masterclass** (899€, 12h) - For professional acts

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

- `REACT_APP_SUPABASE_URL` - Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Supabase anonymous key
- `REACT_APP_STRIPE_PUBLIC_KEY` - Stripe publishable key
- `REACT_APP_SENDGRID_API_KEY` - SendGrid API key (optional for development)

## 🧪 Testing

### Manual Testing Checklist

**Booking Flow:**
- [ ] Quiz leads to correct level recommendation
- [ ] All form validations work
- [ ] Stripe checkout opens correctly
- [ ] Confirmation email is sent
- [ ] Booking appears in database

**Admin Dashboard:**
- [ ] Login works
- [ ] Can view all bookings
- [ ] Can update booking status
- [ ] Analytics display correctly

**Responsive Design:**
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1280px width)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables on Vercel
Add all variables from `.env.local` to Vercel:
- Settings → Environment Variables
- Add each `REACT_APP_*` variable

## 📚 Resources

- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🐛 Troubleshooting

### Common Issues

**Issue: Dependencies won't install**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Supabase connection fails**
- Check if `.env.local` exists and has correct values
- Verify Supabase project URL and keys
- Check Supabase dashboard for RLS policies

**Issue: Stripe checkout doesn't work**
- Verify Stripe public key in `.env.local`
- Check browser console for errors
- Ensure backend endpoint is implemented (see `services/stripe.js` TODOs)

**Issue: Emails not sending**
- SendGrid requires backend implementation
- Check `services/sendgrid.js` for TODOs
- For development, check console logs for email templates

## 📞 Support

For questions or issues:
- Check README.md for project overview
- Review SUPABASE_SETUP.md for database setup
- Check GitHub issues

## 🎉 Success Criteria

Project is ready when:
- ✅ All dependencies installed
- ✅ Supabase connected and working
- ✅ Booking flow complete (form → payment → confirmation)
- ✅ Admin dashboard functional
- ✅ Responsive design on all devices
- ✅ Lighthouse score > 90
- ✅ Zero critical bugs

---

**Last Updated:** December 2025
**Status:** Phase 2 - Backend Complete, Frontend In Progress
