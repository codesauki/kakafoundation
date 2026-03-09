#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../public/images/gallery');

// Read all PNG files
const files = fs.readdirSync(galleryDir)
  .filter(f => f.endsWith('.png'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)[0]);
    const numB = parseInt(b.match(/\d+/)[0]);
    return numA - numB;
  });

// Generate gallery data
const galleryCode = `// Auto-generated gallery images list from actual files
export const galleryImages = [
${files.map((filename, idx) => `  { id: ${idx + 1}, src: '/images/gallery/${filename}', alt: 'Gallery Image ${idx + 1}', width: 600, height: 600 }`).join(',\n')}
];

export const featuredGalleryImages = galleryImages.slice(0, 12);
export const totalImages = galleryImages.length;

export function getImagePath(index: number): string {
  return galleryImages[index]?.src || '';
}
`;

const outputPath = path.join(__dirname, '../data/gallery.ts');
fs.writeFileSync(outputPath, galleryCode);

console.log(`✅ Generated gallery.ts with ${files.length} images`);
console.log(`   First image: ${files[0]}`);
console.log(`   Last image: ${files[files.length - 1]}`);
