#!/usr/bin/env node

/**
 * 🎨 Open WebUI Branding Customization Script
 * 
 * This script helps you quickly customize:
 * 1. Logo files
 * 2. App name/title
 * 3. Remove specific branding elements
 * 
 * Usage: node scripts/customize-branding.js
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  // 🎯 Customize these values for your brand
  APP_NAME: 'Your Custom AI', // Replace "Open WebUI" with this
  COMPANY_NAME: 'Your Company', // Your company name
  REMOVE_OPEN_WEBUI_REFERENCES: true, // Set to true to remove "Open WebUI" text
  
  // 📁 Logo file paths (place your custom logos here)
  LOGOS: {
    favicon: './static/favicon.png',
    faviconDark: './static/favicon-dark.png',
    appleTouchIcon: './static/apple-touch-icon.png'
  }
};

const FILES_TO_CUSTOMIZE = [
  // Main branding components
  'src/lib/components/layout/Sidebar.svelte',
  'src/lib/components/OnBoarding.svelte', 
  'src/routes/auth/+page.svelte',
  'src/lib/components/chat/Settings/About.svelte',
  'src/app.html',
  
  // Configuration files
  'static/manifest.json'
];

function replaceInFile(filePath, searchValue, replaceValue) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(new RegExp(searchValue, 'g'), replaceValue);
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function customizeBranding() {
  console.log('🎨 Starting Open WebUI Branding Customization...\n');
  
  let updatedFiles = 0;
  
  // 1. Replace "Open WebUI" with custom app name
  if (CONFIG.REMOVE_OPEN_WEBUI_REFERENCES) {
    console.log(`📝 Replacing "Open WebUI" with "${CONFIG.APP_NAME}"`);
    
    FILES_TO_CUSTOMIZE.forEach(file => {
      if (replaceInFile(file, 'Open WebUI', CONFIG.APP_NAME)) {
        updatedFiles++;
      }
    });
  }
  
  // 2. Update app.html title
  if (replaceInFile('src/app.html', '<title>.*?</title>', `<title>${CONFIG.APP_NAME}</title>`)) {
    updatedFiles++;
  }
  
  // 3. Update manifest.json
  if (fs.existsSync('static/manifest.json')) {
    try {
      const manifest = JSON.parse(fs.readFileSync('static/manifest.json', 'utf8'));
      manifest.name = CONFIG.APP_NAME;
      manifest.short_name = CONFIG.APP_NAME;
      fs.writeFileSync('static/manifest.json', JSON.stringify(manifest, null, 2));
      console.log('✅ Updated: static/manifest.json');
      updatedFiles++;
    } catch (error) {
      console.error('❌ Error updating manifest.json:', error.message);
    }
  }
  
  // 4. Logo replacement instructions
  console.log('\n🖼️  Logo Customization:');
  console.log('Replace these files with your custom logos:');
  Object.entries(CONFIG.LOGOS).forEach(([name, path]) => {
    console.log(`   • ${name}: ${path}`);
  });
  
  console.log('\n📏 Logo Requirements:');
  console.log('   • favicon.png: 32x32px, PNG with transparency');
  console.log('   • favicon-dark.png: 32x32px, PNG with transparency (dark theme)');
  console.log('   • apple-touch-icon.png: 180x180px, PNG');
  
  // 5. Summary
  console.log(`\n🎉 Customization Complete!`);
  console.log(`   • Files updated: ${updatedFiles}`);
  console.log(`   • App name: ${CONFIG.APP_NAME}`);
  
  console.log('\n🚀 Next Steps:');
  console.log('   1. Replace logo files in /static/ directory');
  console.log('   2. Run: npm run dev');
  console.log('   3. Visit: http://localhost:5173');
  
  console.log('\n📋 Optional Customizations:');
  console.log('   • Edit src/lib/components/chat/Settings/About.svelte for about page');
  console.log('   • Edit src/lib/components/layout/Sidebar.svelte for sidebar branding');
  console.log('   • Edit LICENSE file for your custom license terms');
}

// Run the customization
customizeBranding(); 