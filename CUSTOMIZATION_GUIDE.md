# 🎯 Open WebUI Customization Guide

## Overview
This guide covers customizing Open WebUI with:
1. ✅ Custom Logo & Branding
2. ✅ PDF Download for Artifacts
3. ✅ Branding Element Removal

---

## ✅ What We've Implemented

### 📄 PDF Download Feature
- ✅ **Added PDF export to artifacts**
- ✅ **Uses jsPDF + html2canvas libraries**
- ✅ **High-quality A4 PDF generation**
- ✅ **Multi-page support for long content**

### 🎨 Branding Customization Tools
- ✅ **Automated branding script**: `scripts/customize-branding.js`
- ✅ **Logo replacement guide**
- ✅ **Text replacement automation**

---

## 🖼️ 1. Logo Customization

### Replace Logo Files
Replace these files with your custom logos:

```bash
# Main logos (keep same filenames)
static/favicon.png           # Light theme logo
static/favicon-dark.png      # Dark theme logo  
static/apple-touch-icon.png  # Mobile app icon
```

### Logo Requirements:
- **Format**: PNG with transparency
- **Size**: 32x32px for favicon, 180x180px for apple-touch-icon
- **Style**: Simple, recognizable design

---

## 🏷️ 2. Branding Removal/Modification

### Automated Approach:
```bash
# Run the branding customization script
node scripts/customize-branding.js
```

### Manual Approach:
#### Main Branding Components:
- `src/lib/components/chat/Settings/About.svelte` - About page
- `src/lib/components/layout/Sidebar.svelte` - Main sidebar
- `src/lib/components/OnBoarding.svelte` - First-time setup
- `src/routes/auth/+page.svelte` - Login page

#### Replace "Open WebUI" text in:
```bash
# Search and replace across all files
grep -r "Open WebUI" src/ --include="*.svelte"
```

---

## 📄 3. PDF Download Feature for Artifacts

### How to Use:
1. **Generate an artifact** (HTML/CSS/JS content) in chat
2. **Click the Artifacts button** in the chat interface
3. **Use the new PDF download button** alongside HTML download

### Features:
- **High-quality PDF export** using jsPDF
- **A4 page format** with proper scaling
- **Multi-page support** for long content
- **White background** for clean output
- **Error handling** with user feedback

---

## 🚀 Quick Start Commands

### 1. Setup Development Environment:
```bash
# Install dependencies
npm install

# Start frontend development server
npm run dev
# Access at: http://localhost:5173
```

### 2. Customize Your Branding:
```bash
# Run the branding customization script
node scripts/customize-branding.js

# Or manually replace logos in static/ directory
```

### 3. Backend Setup (Python):
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8080
```

### 4. Build for Production:
```bash
npm run build
```

---

## 🧪 Testing Your Customizations

### Test PDF Download:
1. Start the dev server: `npm run dev`
2. Create a chat with HTML/CSS content
3. Look for the artifacts panel
4. Test both HTML and PDF download buttons

### Test Branding Changes:
1. Run the customization script
2. Check the login page, sidebar, and about section
3. Verify logo changes in browser tabs

---

## 📁 Project Structure
```
open-webui/
├── src/
│   ├── lib/components/     # Svelte components
│   │   └── chat/
│   │       └── Artifacts.svelte  # ✅ PDF download added here
│   ├── routes/            # Page routes
│   └── app.html          # Main HTML template
├── static/               # Static assets (logos, icons)
├── scripts/
│   └── customize-branding.js  # ✅ Branding customization tool
├── backend/              # Python backend
└── package.json         # Frontend dependencies
```

---

## 🔧 Advanced Customizations

### Custom CSS Themes:
- Edit `src/app.css` for global styles
- Modify `tailwind.config.js` for design system changes

### API Integrations:
- Backend API code in `backend/open_webui/`
- Frontend API calls in `src/lib/apis/`

### Additional Features:
- Add new routes in `src/routes/`
- Create new components in `src/lib/components/`

---

## 📞 Support & Troubleshooting

### Common Issues:
1. **PDF not generating**: Check browser console for errors
2. **Logos not showing**: Verify file paths and formats
3. **Build errors**: Run `npm install` to ensure dependencies

### Need Help?
- Check the original Open WebUI documentation
- Review the code changes in this customization guide
- Test in development mode before production deployment 