# Memorial Weekend Website - Design System & Documentation

## 📐 Sitemap

```
Homepage (index.html)
├── Hero Banner
├── About the Event
├── Event Schedule
├── Mission & History
├── Gallery
├── Sponsors
├── Contact & Volunteer
└── Donate / Support

Additional Pages:
├── Gallery (gallery.html) - Full gallery view
└── Thank You (thank-you.html) - Post-donation/contact
```

## 🎨 Color Palette

### Primary Colors

- **Patriot Red**: `#B22234` - Primary CTA buttons, headers, accents
- **Navy Blue**: `#002868` - Primary text, navigation, footer
- **Pure White**: `#FFFFFF` - Backgrounds, text on dark sections
- **Gold Accent**: `#D4AF37` - Special highlights, borders, honor elements

### Supporting Colors

- **Dark Navy**: `#0A1128` - Deep backgrounds, overlays
- **Light Gray**: `#F5F5F5` - Section backgrounds, cards
- **Medium Gray**: `#666666` - Body text, secondary text
- **Light Blue**: `#E8F0F7` - Subtle section dividers
- **Gold Hover**: `#C9B037` - Interactive gold elements

### Gradient Combinations

- **Patriotic Gradient**: `linear-gradient(135deg, #B22234 0%, #002868 100%)`
- **Gold Accent**: `linear-gradient(90deg, #D4AF37 0%, #C9B037 100%)`
- **Subtle Blue**: `linear-gradient(180deg, #002868 0%, #0A1128 100%)`

## 🔤 Typography

### Font Families

- **Headers**: `'Playfair Display', serif` - Elegant, ceremonial feel
- **Body Text**: `'Montserrat', sans-serif` - Modern, readable
- **Special Text**: `'Cinzel', serif` - For ceremonial quotes (optional)

### Font Sizes & Weights

```css
/* Headers */
H1 (Hero): 3.5rem / 56px - font-weight: 900
H2 (Section): 2.5rem / 40px - font-weight: 700
H3 (Card): 1.75rem / 28px - font-weight: 600
H4 (Sub): 1.25rem / 20px - font-weight: 600

/* Body */
Body Large: 1.125rem / 18px - font-weight: 400
Body Standard: 1rem / 16px - font-weight: 400
Body Small: 0.875rem / 14px - font-weight: 400

/* Special */
Button Text: 1rem / 16px - font-weight: 600
Nav Links: 0.95rem / 15px - font-weight: 500
```

### Responsive Scaling

```css
/* Mobile (< 768px) */
H1: 2.5rem
H2: 2rem
H3: 1.5rem

/* Tablet (768px - 1024px) */
H1: 3rem
H2: 2.25rem
H3: 1.625rem
```

## 📏 Wireframe Layouts

### Homepage Structure

```
┌─────────────────────────────────────┐
│         NAVIGATION BAR              │
│  [Logo] Home Event About Contact    │
│                        [DONATE BTN] │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          HERO BANNER                │
│    [Background: Flag/Memorial]      │
│                                     │
│      HONORING OUR HEROES            │
│      Memorial Weekend 2026          │
│      May 23-25, 2026                │
│                                     │
│   [RSVP NOW]  [LEARN MORE]          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       ABOUT THE EVENT               │
│  [Image Left] [Content Right]       │
│  - Event description                │
│  - Key highlights                   │
│  - Impact numbers                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      EVENT SCHEDULE (TIMELINE)      │
│  May 23 │ May 24 │ May 25           │
│  ─────────────────────────          │
│  Events listed with times           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      MISSION & HISTORY              │
│  [Content in centered column]       │
│  - Organization mission             │
│  - Historical context               │
│  - Our impact                       │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          GALLERY                    │
│  [Image Grid: 6-8 photos]           │
│  [View Full Gallery Button]         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         SPONSORS                    │
│  [Logo Grid with hover effects]     │
│  [Become a Sponsor CTA]             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    CONTACT & VOLUNTEER              │
│  [Form Left] [Map/Info Right]       │
│  - Contact form                     │
│  - Volunteer signup                 │
│  - Location map                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│       DONATE / SUPPORT              │
│  [Centered donation options]        │
│  - One-time donation                │
│  - Monthly support                  │
│  - 501(c)(3) tax info               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           FOOTER                    │
│  [Logo] [Links] [Social] [Legal]   │
└─────────────────────────────────────┘
```

### Mobile Wireframe (< 768px)

- Single column stack
- Hamburger menu navigation
- Touch-friendly buttons (min 44px)
- Condensed hero with vertical layout
- Collapsible sections
- Sticky donate button

## 📝 Example Copy for Key Sections

### Hero Banner

**Main Headline**: "Honoring Those Who Gave All"  
**Subheadline**: "Memorial Weekend 2026 - A Tribute to America's Fallen Heroes"  
**Date**: "May 23-25, 2026 | Woodward Park, Manteca, CA"  
**Primary CTA**: "Reserve Your Spot"  
**Secondary CTA**: "Support Our Mission"

### About the Event

**Heading**: "A Weekend of Remembrance"

Join us for the 2026 Memorial Weekend Tribute at Woodward Park in Manteca, California. This three-day event honors the brave men and women who made the ultimate sacrifice in service to our nation.

Through ceremony, community, and reflection, we come together to ensure their legacy lives on. This isn't just an event—it's a promise that they will never be forgotten.

**Key Highlights:**

- 🎖️ 3-Day Memorial Ceremony
- 🇺🇸 Patriotic Parade & Program
- 🎵 Live Music & Military Tributes
- 👨‍👩‍👧‍👦 Family-Friendly Activities
- 🍔 Community BBQ & Fellowship

### Mission & History

**Heading**: "Our Mission: To Honor, Remember, and Serve"

**Mission Statement:**
The Not Forgotten Foundation is dedicated to honoring our fallen heroes, supporting Gold Star families, and ensuring that the sacrifices of our service members are remembered for generations to come.

**Our History:**
Founded by veterans who understand the cost of freedom, our organization has been serving the community for over [X] years. What began as a small local gathering has grown into one of California's most respected Memorial Day tributes.

**By the Numbers:**

- 🎖️ 15+ Years of Service
- 🤝 10,000+ Community Members Served
- 💰 $500K+ Raised for Veterans Programs
- 🏅 50+ Gold Star Families Supported

### Event Schedule

**Friday, May 23rd**

- 5:00 PM - Opening Ceremony
- 6:00 PM - Candlelight Vigil
- 7:30 PM - Evening Concert

**Saturday, May 24th**

- 9:00 AM - Community 5K Run/Walk
- 11:00 AM - Memorial Service
- 1:00 PM - BBQ & Fellowship
- 3:00 PM - Children's Activities
- 6:00 PM - Evening Program

**Sunday, May 25th**

- 10:00 AM - Wreath Laying Ceremony
- 11:30 AM - Guest Speaker Program
- 1:00 PM - Closing Ceremony

### Contact & Volunteer

**Heading**: "Get Involved - Your Time Makes a Difference"

Whether you can spare a few hours or want to become a regular volunteer, we need you. From event setup to supporting Gold Star families, there are many ways to serve those who served us.

**Volunteer Opportunities:**

- Event Setup & Coordination
- Greeting & Guest Services
- Photography & Media
- Food Service
- Children's Activities
- Logistics & Transportation

**Contact Information:**
📍 Woodward Park, Manteca, CA 95336  
📞 (209) 456-6263  
📧 info@thememorialweekend.com  
🕒 Office Hours: Mon-Fri, 9am-5pm PST

### Donate / Support

**Heading**: "Support Our Mission"

Your generous donations help us honor our fallen heroes and support Gold Star families throughout the year. As a 501(c)(3) nonprofit organization, all contributions are tax-deductible.

**Ways to Give:**

- One-Time Donation
- Monthly Supporter ($25, $50, $100, $250)
- Corporate Sponsorship
- In-Kind Donations
- Memorial Gifts

**Impact of Your Gift:**

- $50 - Provides flags for ceremony
- $100 - Supports one Gold Star family
- $250 - Sponsors a veteran speaker
- $500+ - Major event sponsorship

**Tax ID**: XX-XXXXXXX (501c3 Nonprofit)

## ♿ Accessibility Recommendations

### WCAG 2.1 AA Compliance

**Color Contrast:**

- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text (18pt+)
- Navy (#002868) on White = 13.13:1 ✓
- Red (#B22234) on White = 5.32:1 ✓

**Keyboard Navigation:**

- All interactive elements accessible via Tab
- Skip to main content link
- Focus indicators on all clickable elements
- Logical tab order

**Screen Reader Support:**

- Semantic HTML5 elements
- ARIA labels for all buttons and links
- Alt text for all images
- Proper heading hierarchy (H1 → H2 → H3)

**Responsive & Accessible:**

- Minimum touch target size: 44x44px
- Readable font sizes (minimum 16px body)
- No text in images
- Captions for video content
- Transcripts for audio

**Forms:**

- Proper label associations
- Error message announcements
- Required field indicators
- Clear validation messages

**Implementation Checklist:**

```html
<!-- Example accessible button -->
<button aria-label="Donate now to support veterans" class="btn-primary">
  Donate Now
</button>

<!-- Example accessible image -->
<img
  src="hero.jpg"
  alt="Memorial Day ceremony with American flags at Woodward Park"
/>

<!-- Skip to main content -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## 🔍 SEO Optimization

### Meta Tags

```html
<title>Memorial Weekend 2026 - Honoring Our Fallen Heroes | Manteca, CA</title>
<meta
  name="description"
  content="Join us May 23-25, 2026 for Memorial Weekend at Woodward Park, Manteca. A three-day tribute honoring America's fallen heroes with ceremonies, community events, and remembrance."
/>
<meta
  name="keywords"
  content="Memorial Day, veterans, Manteca CA, military tribute, fallen heroes, Memorial Weekend, American Legion, Gold Star families"
/>

<!-- Open Graph -->
<meta
  property="og:title"
  content="Memorial Weekend 2026 - Honoring Our Fallen Heroes"
/>
<meta
  property="og:description"
  content="Three-day memorial tribute May 23-25, 2026 at Woodward Park, Manteca, CA"
/>
<meta
  property="og:image"
  content="https://thememorialweekend.com/images/og-image.jpg"
/>
<meta property="og:url" content="https://thememorialweekend.com" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Memorial Weekend 2026" />
<meta
  name="twitter:description"
  content="Honoring Our Fallen Heroes - May 23-25, 2026"
/>
<meta
  name="twitter:image"
  content="https://thememorialweekend.com/images/twitter-card.jpg"
/>

<!-- Local Business Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Memorial Weekend 2026",
    "startDate": "2026-05-23",
    "endDate": "2026-05-25",
    "location": {
      "@type": "Place",
      "name": "Woodward Park",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Woodward Park",
        "addressLocality": "Manteca",
        "addressRegion": "CA",
        "postalCode": "95336",
        "addressCountry": "US"
      }
    },
    "description": "Three-day Memorial Day tribute honoring America's fallen heroes",
    "organizer": {
      "@type": "Organization",
      "name": "Not Forgotten Foundation",
      "url": "https://thememorialweekend.com"
    }
  }
</script>
```

### Performance Optimization

- Compress images (WebP format, max 200KB)
- Minify CSS and JavaScript
- Implement lazy loading for images
- Use CDN for external resources
- Enable browser caching
- Optimize Google Fonts loading

### Content Strategy

- H1 tag on every page (unique)
- Descriptive URLs (e.g., /event-schedule)
- Internal linking between pages
- Regular content updates (blog/news)
- Alt text on all images (descriptive)
- XML sitemap generation

### Technical SEO

- SSL certificate (HTTPS)
- Mobile-friendly (responsive design)
- Fast load time (< 3 seconds)
- Clean URL structure
- Robots.txt file
- 404 error page

### Local SEO

- Google Business Profile optimization
- Local keywords (Manteca, CA)
- NAP consistency (Name, Address, Phone)
- Local backlinks
- Event listings on community calendars

## 📱 Mobile Optimization

### Responsive Breakpoints

```css
/* Mobile First Approach */
- Mobile: 320px - 767px
- Tablet: 768px - 1024px
- Desktop: 1025px+
- Large Desktop: 1440px+
```

### Mobile-Specific Features

- Hamburger navigation menu
- Touch-optimized buttons (min 44x44px)
- Swipeable gallery
- Click-to-call phone numbers
- Click-to-navigate address
- Sticky donate button
- Simplified forms
- Collapsible FAQ sections

## 🎯 Call-to-Action Strategy

### Primary CTAs

1. **"Reserve Your Spot"** - Hero section
2. **"Donate Now"** - Multiple sections + sticky
3. **"Become a Volunteer"** - Contact section

### Secondary CTAs

- "Learn More" - About section
- "View Schedule" - Event section
- "See Gallery" - Gallery preview
- "Become a Sponsor" - Sponsors section
- "Subscribe to Updates" - Footer

### CTA Design

- High contrast colors
- Clear, action-oriented text
- Generous padding (16px vertical, 32px horizontal)
- Hover/active states
- Loading states for forms
- Success confirmation messages

---

_Design System v1.0 - Created for Memorial Weekend 2026_
