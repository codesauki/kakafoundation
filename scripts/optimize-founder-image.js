#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public/images/founder-portrait.png');
const outputPath = path.join(__dirname, 'public/images/founder-portrait.png');

async function optimizeImage() {
  try {
    console.log('🖼️  Optimizing founder portrait...');
    
    const info = await sharp(inputPath)
      .resize(600, 600, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 80, progressive: true })
      .toFile(outputPath + '.tmp');
    
    // Only replace if optimization reduced size
    const origSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath + '.tmp').size;
    
    if (newSize < origSize) {
      fs.renameSync(outputPath + '.tmp', outputPath);
      console.log(`✅ Optimized successfully!`);
      console.log(`   Original: ${(origSize / 1024).toFixed(2)} KB`);
      console.log(`   Optimized: ${(newSize / 1024).toFixed(2)} KB`);
      console.log(`   Saved: ${((1 - newSize/origSize) * 100).toFixed(1)}%`);
    } else {
      fs.unlinkSync(outputPath + '.tmp');
      console.log('📌 Image already well-optimized, keeping original');
    }
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    process.exit(1);
  }
}

optimizeImage();
