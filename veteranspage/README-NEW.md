# Memorial Weekend 2026 - Complete Website Redesign

A respectful, modern, and ceremonial website honoring America's fallen heroes. Redesigned with patriotic colors, mobile-first responsive design, and comprehensive accessibility features.

## 🎨 Design Overview

### Color Palette

- **Patriot Red**: `#B22234` - Primary CTAs, headers, accents
- **Navy Blue**: `#002868` - Primary text, navigation, footer
- **Pure White**: `#FFFFFF` - Backgrounds, text on dark sections
- **Gold Accent**: `#D4AF37` - Special highlights, borders, honor elements
- **Supporting Colors**: Dark Navy (#0A1128), Light Gray (#F5F5F5), Light Blue (#E8F0F7)

### Typography

- **Headers**: Playfair Display (elegant, ceremonial)
- **Body**: Montserrat (modern, readable)
- **Font Sizes**: Fully responsive with mobile-first scaling

## 📋 Site Sections

1. **Hero Banner** - Full-screen with event details and CTAs
2. **About the Event** - Event overview with key highlights and statistics
3. **Event Schedule** - Interactive 3-day timeline (May 23-25, 2026)
4. **Mission & History** - Organization mission, history, and core values
5. **Gallery** - Photo grid with Facebook integration
6. **Sponsors** - Tiered sponsor display (Gold, Silver, Bronze)
7. **Contact & Volunteer** - Contact form, volunteer opportunities, embedded map
8. **Donate / Support** - Multiple donation options with nonprofit information

## 🚀 Quick Start

### View Locally

1. **Option 1: Direct File**

   ```bash
   # Navigate to the veteranspage directory
   cd veteranspage

   # Open in browser
   # Use index-new.html for the new design
   open index-new.html
   ```

2. **Option 2: Local Server (Recommended)**

   ```bash
   # Using Python
   python3 -m http.server 8000
   # Then visit: http://localhost:8000/index-new.html

   # Using Node.js
   npx serve
   # Then visit: http://localhost:3000/index-new.html
   ```

### Deploy to Production

1. **Replace Current Files**

   ```bash
   # Backup current files
   mv index.html index-old.html
   mv css/style.css css/style-old.css
   mv js/script.js js/script-old.js

   # Use new files
   mv index-new.html index.html
   mv css/style-new.css css/style.css
   mv js/script-new.js js/script.js
   ```

2. **Update Logo**

   - Place your new logo in `images/logo.png`
   - Recommended size: 200x50px (transparent background)
   - Formats: PNG or SVG

3. **Add Gallery Images**

   - Download photos from [Facebook Gallery](https://www.facebook.com/notforgottencalifornia/photos)
   - Place in `images/gallery/` folder
   - Recommended: 6-8 high-quality images
   - Size: 1200x900px (4:3 ratio), optimized WebP format
   - Update HTML gallery section with actual image paths

4. **Customize Content**
   - Update event details in HTML
   - Replace placeholder text with actual copy
   - Add sponsor logos to `images/sponsors/` folder
   - Update contact information and form endpoints

## 📱 Features

### Responsive Design

- **Mobile First**: Optimized for mobile devices (320px+)
- **Tablet Support**: Adapted layouts for tablets (768px+)
- **Desktop**: Full-featured experience (1025px+)
- **Breakpoints**: 320px, 768px, 1024px, 1440px

### Accessibility (WCAG 2.1 AA)

- ✅ Color contrast ratios meet WCAG standards
- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ ARIA labels on all interactive elements
- ✅ Skip to main content link
- ✅ Semantic HTML5 elements
- ✅ Focus indicators on all clickable elements
- ✅ Minimum 44x44px touch targets

### SEO Optimized

- ✅ Semantic HTML structure
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Structured data (Schema.org Event)
- ✅ Descriptive alt text for images
- ✅ Clean URL structure
- ✅ Fast loading times (<3 seconds target)

### Interactive Elements

- **Mobile Navigation**: Hamburger menu with smooth transitions
- **Schedule Tabs**: Interactive 3-day event schedule
- **Contact Form**: Validation and submission handling
- **Smooth Scrolling**: Animated navigation to sections
- **Sticky Donate Button**: Appears on mobile scroll
- **Gallery Lightbox**: Click to enlarge images
- **Scroll Animations**: Fade-in effects on scroll
- **Form Validation**: Real-time email and phone validation

## 🗺️ Map Integration

The contact section includes an embedded Google Map for Woodward Park, Manteca, CA.

**To customize:**

1. Visit [Google Maps](https://www.google.com/maps)
2. Search for your event location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in the contact section

## 💰 Payment Integration

The donate section is set up for easy payment integration:

### Recommended Payment Processors

- **Stripe**: [stripe.com](https://stripe.com) - Popular, easy integration
- **PayPal**: [paypal.com](https://paypal.com) - Widely accepted
- **Donorbox**: [donorbox.org](https://donorbox.org) - Nonprofit focused
- **Give Lively**: [givelively.org](https://givelively.org) - Free for nonprofits

### Implementation Steps

1. Sign up for payment processor
2. Create donation buttons/forms
3. Replace placeholder donate buttons with actual payment links
4. Add JavaScript for payment modal/redirect
5. Set up webhooks for donation tracking

## 📧 Contact Form Setup

The contact form currently has client-side validation. To make it functional:

### Option 1: Form Service (Easiest)

Use a service like:

- **Formspree**: [formspree.io](https://formspree.io)
- **Netlify Forms**: [netlify.com/products/forms](https://netlify.com/products/forms)
- **Formspark**: [formspark.io](https://formspark.io)

### Option 2: Custom Backend

```javascript
// Update in js/script-new.js
const response = await fetch("YOUR_API_ENDPOINT", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

## 🌐 Social Media

Update social media links in the footer and contact sections:

- Facebook: https://www.facebook.com/notforgottencalifornia
- Twitter: Add your Twitter handle
- Instagram: Add your Instagram handle
- YouTube: Add your YouTube channel

## 📊 Analytics Setup

### Google Analytics

```html
<!-- Add before </head> -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Facebook Pixel

```html
<!-- Add before </head> -->
<script>
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  fbq("init", "YOUR_PIXEL_ID");
  fbq("track", "PageView");
</script>
```

## 🎯 Performance Optimization

### Image Optimization

1. **Compress images**: Use [TinyPNG](https://tinypng.com) or [ImageOptim](https://imageoptim.com)
2. **Use WebP format**: Better compression than JPEG/PNG
3. **Lazy loading**: Already implemented in HTML
4. **Responsive images**: Use srcset for different screen sizes

```html
<img
  src="image-800w.webp"
  srcset="image-400w.webp 400w, image-800w.webp 800w, image-1200w.webp 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
  alt="Description"
  loading="lazy"
/>
```

### CSS/JS Optimization

```bash
# Minify CSS
npx csso css/style-new.css --output css/style.min.css

# Minify JavaScript
npx terser js/script-new.js --compress --mangle --output js/script.min.js
```

### CDN Resources

- Google Fonts: Already using Google CDN
- Font Awesome: Using Cloudflare CDN
- Consider using CDN for images (Cloudflare, AWS CloudFront)

## 🔒 Security Best Practices

1. **HTTPS**: Ensure SSL certificate is installed
2. **Form Protection**: Add reCAPTCHA to prevent spam
3. **Content Security Policy**: Add CSP headers
4. **CSRF Protection**: Implement for forms
5. **Regular Updates**: Keep dependencies updated

### Add reCAPTCHA

```html
<!-- Add before </head> -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<!-- Add to form -->
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

## 📦 File Structure

```
veteranspage/
├── index.html              # Main homepage (new design)
├── index-new.html          # Backup new design
├── index-old.html          # Backup old design
├── DESIGN-SYSTEM.md        # Complete design documentation
├── README.md               # This file
├── css/
│   ├── style.css           # Main stylesheet (new design)
│   ├── style-new.css       # Backup new stylesheet
│   └── style-old.css       # Backup old stylesheet
├── js/
│   ├── script.js           # Main JavaScript (new design)
│   ├── script-new.js       # Backup new script
│   └── script-old.js       # Backup old script
└── images/
    ├── logo.png            # Organization logo
    ├── og-image.jpg        # Social sharing image (1200x630px)
    ├── twitter-card.jpg    # Twitter card image (1200x675px)
    ├── gallery/            # Event photos
    │   ├── photo1.jpg
    │   └── ...
    └── sponsors/           # Sponsor logos
        ├── sponsor1.png
        └── ...
```

## 🧪 Testing Checklist

### Functionality

- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Mobile menu opens/closes
- [ ] Schedule tabs switch correctly
- [ ] All external links open in new tab
- [ ] Phone numbers are clickable
- [ ] Email links work
- [ ] Map loads correctly
- [ ] Smooth scrolling works
- [ ] Sticky donate button appears

### Responsive

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on iPad
- [ ] Test on desktop (1920px)
- [ ] Test on small mobile (320px)

### Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes WCAG
- [ ] Focus indicators visible
- [ ] Skip to content works

### Performance

- [ ] Page loads in under 3 seconds
- [ ] Images are optimized
- [ ] No console errors
- [ ] Mobile performance good (Lighthouse)

### Browsers

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## 📚 Additional Resources

### Documentation

- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) - Complete design specifications
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

### Tools

- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## 🆘 Support

### Common Issues

**Issue**: Images not showing

- Check file paths are correct
- Ensure images are in the correct folder
- Verify image file extensions (.jpg, .png, .webp)

**Issue**: Form not submitting

- Check form action attribute
- Verify JavaScript is enabled
- Check browser console for errors

**Issue**: Mobile menu not working

- Verify JavaScript is loaded
- Check for JavaScript errors
- Ensure nav-toggle button exists

**Issue**: Map not loading

- Check Google Maps API key
- Verify iframe src URL
- Check for JavaScript console errors

## 📝 License & Credits

### Organization

**Not Forgotten Foundation**  
501(c)(3) Nonprofit Organization  
Tax ID: 81-5431454

### Website Credits

- Design: Patriotic Memorial Theme 2026
- Fonts: Google Fonts (Playfair Display, Montserrat)
- Icons: Font Awesome 6.4.0
- Framework: Vanilla HTML/CSS/JavaScript

### Photography

- Event photos: Not Forgotten California Facebook
- Background images: Unsplash (patriotic themes)

## 🔄 Future Enhancements

### Phase 2 Features

- [ ] Event registration system
- [ ] Volunteer management portal
- [ ] Photo gallery upload system
- [ ] Blog/news section
- [ ] Email newsletter signup
- [ ] Multi-language support
- [ ] Event countdown timer
- [ ] Social media feed integration
- [ ] Testimonials section
- [ ] Video embed capability

### Technical Improvements

- [ ] Progressive Web App (PWA)
- [ ] Service Worker for offline support
- [ ] Push notifications
- [ ] Advanced analytics dashboard
- [ ] CMS integration (WordPress, etc.)

---

**Website**: https://thememorialweekend.com  
**Facebook**: https://www.facebook.com/notforgottencalifornia  
**Phone**: (209) 456-6263  
**Email**: info@thememorialweekend.com

_Honoring those who gave all. Memorial Weekend 2026._
