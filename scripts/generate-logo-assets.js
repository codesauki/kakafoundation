#!/usr/bin/env node
/**
 * Logo and Icon Generation Script
 * Processes the foundation logo and generates all required icons, favicons, and social media cards
 * 
 * Requirements: npm install sharp
 * Usage: node scripts/generate-logo-assets.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = path.join(__dirname, '../1000332910.jpg');
const outputDir = path.join(__dirname, '../public');
const iconsDir = path.join(outputDir, 'icons');
const imagesDir = path.join(outputDir, 'images');

// Ensure directories exist
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

async function generateAssets() {
  try {
    console.log('🎨 Processing foundation logo...');

    // 1. Main logo for website
    await sharp(sourceImage)
      .resize(400, 400, { fit: 'cover', position: 'center' })
      .toFile(path.join(imagesDir, 'logo.png'));
    console.log('✅ Logo (400x400) created');

    // 2. Logo with transparency for nav
    await sharp(sourceImage)
      .resize(200, 200, { fit: 'cover', position: 'center' })
      .toFile(path.join(imagesDir, 'logo-sm.png'));
    console.log('✅ Logo small (200x200) created');

    // 3. Favicon (16x16)
    await sharp(sourceImage)
      .resize(16, 16)
      .toFile(path.join(outputDir, 'favicon-16x16.png'));
    console.log('✅ Favicon 16x16 created');

    // 4. Favicon (32x32)
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon-32x32.png'));
    console.log('✅ Favicon 32x32 created');

    // 5. Apple touch icon (180x180)
    await sharp(sourceImage)
      .resize(180, 180)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ Apple touch icon (180x180) created');

    // 6. PWA icons
    const pwaSizes = [192, 512];
    for (const size of pwaSizes) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
      console.log(`✅ PWA icon (${size}x${size}) created`);
    }

    // 7. Open Graph image (1200x630)
    await sharp(sourceImage)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .toFile(path.join(imagesDir, 'og-image.jpg'));
    console.log('✅ Open Graph image (1200x630) created');

    // 8. Twitter card (1200x630)
    await sharp(sourceImage)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .toFile(path.join(imagesDir, 'twitter-card.jpg'));
    console.log('✅ Twitter card (1200x630) created');

    // 9. WhatsApp sharing image (1200x630)
    await sharp(sourceImage)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .toFile(path.join(imagesDir, 'whatsapp-share.jpg'));
    console.log('✅ WhatsApp share image (1200x630) created');

    // 10. Favicon ICO (requires special handling - using PNG as fallback)
    await sharp(sourceImage)
      .resize(32, 32)
      .toFile(path.join(outputDir, 'favicon.png'));
    console.log('✅ Favicon PNG created (use favicon-32x32.png as favicon.ico)');

    console.log('\n✨ All logo and icon assets generated successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Update public/manifest.json with new icon paths');
    console.log('2. Update app/layout.tsx with new icon and OG image paths');
    console.log('3. Test favicon display in browser cache (Ctrl+Shift+Del to clear)');
    console.log('4. Verify PWA icons in manifest.json');

  } catch (error) {
    console.error('❌ Error generating assets:', error.message);
    process.exit(1);
  }
}

generateAssets();
