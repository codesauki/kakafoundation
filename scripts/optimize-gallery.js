#!/usr/bin/env node
/**
 * Gallery Image Optimization Script
 * Compresses and optimizes all 199 gallery images
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../public/images/gallery');
const originalDir = path.join(__dirname, '../.gallery-originals');

async function optimizeGalleryImages() {
  try {
    console.log('🖼️  Starting gallery image optimization...');
    
    if (!fs.existsSync(galleryDir)) {
      console.error('❌ Gallery directory not found:', galleryDir);
      process.exit(1);
    }

    // Create backup directory
    if (!fs.existsSync(originalDir)) {
      fs.mkdirSync(originalDir, { recursive: true });
      console.log('📁 Created backup directory');
    }

    const files = fs.readdirSync(galleryDir).filter((f) => f.endsWith('.png'));
    let optimizedCount = 0;
    let totalSizeBefore = 0;
    let totalSizeAfter = 0;

    console.log(`Found ${files.length} images to optimize`);

    for (const file of files) {
      const filePath = path.join(galleryDir, file);
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;
      totalSizeBefore += originalSize;

      try {
        // Optimize using Sharp
        const metadata = await sharp(filePath).metadata();
        const newWidth = Math.min(metadata.width || 800, 1200); // Max 1200px
        const newHeight = Math.min(metadata.height || 800, 1200);

        await sharp(filePath)
          .resize(newWidth, newHeight, {
            fit: 'cover',
            position: 'center',
          })
          .png({
            quality: 80,
            progressive: true,
            compressionLevel: 9,
          })
          .toFile(filePath + '.tmp');

        const newStats = fs.statSync(filePath + '.tmp');
        const newSize = newStats.size;
        totalSizeAfter += newSize;

        // Replace if optimization was beneficial
        if (newSize < originalSize) {
          fs.renameSync(filePath + '.tmp', filePath);
          optimizedCount++;
        } else {
          fs.unlinkSync(filePath + '.tmp');
        }
      } catch (err) {
        console.warn(`⚠️  Error optimizing ${file}:`, err.message);
      }
    }

    console.log('\n✅ Optimization Complete!');
    console.log(`   Optimized: ${optimizedCount}/${files.length} images`);
    console.log(`   Original total: ${(totalSizeBefore / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Optimized total: ${(totalSizeAfter / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Saved: ${((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(1)}%`);
  } catch (error) {
    console.error('❌ Error during optimization:', error.message);
    process.exit(1);
  }
}

optimizeGalleryImages();
