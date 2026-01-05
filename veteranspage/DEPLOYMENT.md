# GitHub Pages Deployment Guide

## Complete Step-by-Step Instructions

### Prerequisites

- GitHub account
- Git installed on your computer

---

## 🚀 Deployment Instructions

### Option 1: Using GitHub Web Interface (Easiest)

1. **Create a New Repository on GitHub**

   - Go to https://github.com/new
   - Repository name: `veteranspage`
   - Description: "Memorial Day Tribute Website - Not Forgotten"
   - Make it Public
   - **Do NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Upload Files**

   - On the repository page, click "uploading an existing file"
   - Drag and drop all files from the `veteranspage` folder
   - Or click "choose your files" and select all files
   - Make sure to maintain the folder structure:
     ```
     css/style.css
     js/script.js
     images/ (with logo.png)
     index.html
     README.md
     ```
   - Add commit message: "Initial commit - Memorial Day website"
   - Click "Commit changes"

3. **Enable GitHub Pages**

   - Click "Settings" tab (top right)
   - Click "Pages" in left sidebar
   - Under "Source":
     - Branch: `main`
     - Folder: `/ (root)`
   - Click "Save"
   - Wait 1-2 minutes

4. **View Your Website**
   - Your site will be at: `https://YOUR_USERNAME.github.io/veteranspage/`
   - GitHub will show the URL at the top of the Pages settings

---

### Option 2: Using Command Line (Recommended)

1. **Open Terminal/Command Prompt**

   ```bash
   # Navigate to the veteranspage folder
   cd /home/tim/Downloads/ai-projects/hackathon/veteranspage
   ```

2. **Initialize Git Repository**

   ```bash
   git init
   ```

3. **Add Your Files**

   ```bash
   git add .
   ```

4. **Create First Commit**

   ```bash
   git commit -m "Initial commit - Memorial Day tribute website"
   ```

5. **Create Repository on GitHub**

   - Go to https://github.com/new
   - Name: `veteranspage`
   - Make it Public
   - Do NOT initialize with anything
   - Click "Create repository"

6. **Connect Local to GitHub**

   ```bash
   # Replace YOUR_USERNAME with your GitHub username
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/veteranspage.git
   git push -u origin main
   ```

7. **Enable GitHub Pages**

   - Go to repository Settings → Pages
   - Source: Branch `main`, Folder `/ (root)`
   - Click Save

8. **Access Your Site**
   - URL: `https://YOUR_USERNAME.github.io/veteranspage/`

---

## 🎨 Before Publishing Checklist

### Essential Steps:

- [ ] Add your logo to `images/logo.png`
- [ ] Update contact information if needed
- [ ] Test the website locally
- [ ] Check all links work
- [ ] Verify forms are working
- [ ] Test on mobile devices

### Optional Enhancements:

- [ ] Add actual FAQ content
- [ ] Add memorial photos to the gallery
- [ ] Customize colors in `css/style.css`
- [ ] Add Google Analytics tracking
- [ ] Set up form backend (see below)

---

## 📧 Setting Up Contact Forms

The forms currently log to console. To make them functional:

### Option 1: Formspree (Easiest)

1. Sign up at https://formspree.io
2. Update form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"></form>
   ```

### Option 2: Netlify Forms

1. Deploy to Netlify instead of GitHub Pages
2. Add `netlify` attribute to forms
3. Forms automatically work

### Option 3: EmailJS

1. Sign up at https://www.emailjs.com
2. Add EmailJS SDK
3. Configure email templates
4. Update JavaScript to use EmailJS

---

## 🔧 Troubleshooting

### Website Not Showing

- Wait 5-10 minutes after enabling Pages
- Check URL is correct: `username.github.io/veteranspage`
- Ensure `index.html` is in root folder
- Check repository is public

### Images Not Loading

- Verify images are in `images/` folder
- Check file names match exactly (case-sensitive)
- Paths should be: `images/logo.png` not `/images/logo.png`

### CSS/JS Not Working

- Check folder structure matches exactly
- Paths in HTML should be relative: `css/style.css`
- Clear browser cache (Ctrl+Shift+R)

### Mobile Menu Not Working

- Check JavaScript console for errors
- Ensure `script.js` is loading properly
- Verify Font Awesome is loading

---

## 🔄 Updating Your Website

### Via GitHub Web Interface

1. Go to your repository
2. Click on the file to edit
3. Click the pencil icon (Edit)
4. Make changes
5. Commit changes
6. Wait 1-2 minutes for updates

### Via Command Line

```bash
# Make changes to files
git add .
git commit -m "Description of changes"
git push
```

---

## 🌟 Custom Domain (Optional)

To use a custom domain like `notforgotten.org`:

1. **Buy Domain** from provider (Namecheap, GoDaddy, etc.)

2. **Add CNAME File** to repository:

   - Create file named `CNAME` (no extension)
   - Content: `www.yourdomain.com`

3. **Configure DNS** at domain provider:

   ```
   Type: CNAME
   Host: www
   Value: YOUR_USERNAME.github.io
   ```

4. **Update GitHub Pages Settings**

   - Settings → Pages
   - Custom domain: `www.yourdomain.com`
   - Save

5. **Enable HTTPS** (recommended)
   - Check "Enforce HTTPS" in Pages settings

---

## 📊 Adding Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
   ></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       dataLayer.push(arguments);
     }
     gtag("js", new Date());
     gtag("config", "GA_TRACKING_ID");
   </script>
   ```

---

## 🆘 Need Help?

- GitHub Pages Documentation: https://pages.github.com
- GitHub Support: https://support.github.com
- Web Development Help: https://stackoverflow.com

---

## ✅ Final Steps

1. Share your website URL with others
2. Test on different devices and browsers
3. Promote on social media
4. Update regularly with new events and photos

**Your website URL will be:**

```
https://YOUR_USERNAME.github.io/veteranspage/
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

**Good luck with your Memorial Day tribute website! 🇺🇸**
