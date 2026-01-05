# Veterans Page - Memorial Day Tribute Website

A beautiful, modern Memorial Day tribute website honoring our heroes. Created for the American Legion Post 249 Foundation.

## 🇺🇸 Features

- **Responsive Design** - Looks great on all devices (desktop, tablet, mobile)
- **Modern UI/UX** - Clean, patriotic design with smooth animations
- **Interactive Elements** - FAQ accordion, smooth scrolling, contact forms
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Event Calendar** - Display upcoming events
- **Contact Form** - Easy way for visitors to get in touch
- **Newsletter Signup** - Collect email subscriptions
- **Donation Section** - Highlight the 501c3 non-profit status

## 📁 Project Structure

```
veteranspage/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles
├── js/
│   └── script.js      # Interactive functionality
├── images/
│   └── logo.png       # Place your logo here
└── README.md          # This file
```

## 🚀 Quick Start

### Local Testing

1. Simply open `index.html` in your web browser
2. Or use a local server (recommended):

   ```bash
   # If you have Python installed:
   python3 -m http.server 8000
   # Then open http://localhost:8000

   # Or using Node.js:
   npx serve
   ```

### Add Your Logo

Place your "Not Forgotten" logo in the `images` folder and name it `logo.png`

## 📤 Deploy to GitHub Pages

### Step 1: Push to GitHub

1. Open terminal in the `veteranspage` folder
2. Initialize Git repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit - Memorial Day tribute website"
   ```

3. Connect to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/veteranspage.git
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/veteranspage`
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 3: Access Your Website

Your website will be live at:

```
https://YOUR_USERNAME.github.io/veteranspage/
```

It may take a few minutes for the site to be published.

## 🎨 Customization

### Colors

The patriotic color scheme is defined in CSS variables at the top of `style.css`:

```css
:root {
  --primary-color: #b22234; /* Red */
  --secondary-color: #002868; /* Blue */
  --gold-color: #c9b037; /* Gold */
  --dark-blue: #0a1128; /* Dark Blue */
}
```

### Content

Edit `index.html` to update:

- Event dates and times
- Contact information
- FAQ questions and answers
- Text content

### Images

Add images to the `images` folder and reference them in HTML:

```html
<img src="images/your-image.jpg" alt="Description" />
```

## 📱 Sections Included

1. **Navigation Bar** - Sticky navigation with logo
2. **Hero Section** - Large banner with event dates
3. **Call to Action** - "Words From a Warrior" message
4. **Featured Products** - Photo gallery section
5. **Services** - Online appointments section
6. **Donation Section** - Highlighted donation call-to-action
7. **About Section** - Welcome message
8. **Events Calendar** - Upcoming events display
9. **FAQ Section** - Expandable questions
10. **Contact Form** - Get in touch form
11. **Newsletter** - Email signup
12. **Footer** - Copyright and links

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Playfair Display & Montserrat)

## 📧 Contact Information

**Not Forgotten - American Legion Post 249 Foundation**

- Address: 220 East Yosemite Avenue, Manteca, CA
- Phone: +1.209-456-6263
- Email: post249commander@gmail.com
- Tax ID: 81-5431454 (501c3 non-profit)

## 🎯 Event Details

**Memorial Day Tribute 2026**

- Dates: May 23rd, 24th, and 25th, 2026
- Location: Manteca, CA

## 📝 License

Created for American Legion Post 249 Foundation. All rights reserved.

## 🤝 Support

For questions or support, please contact post249commander@gmail.com

---

**Honor. Remember. Never Forget.** 🇺🇸
