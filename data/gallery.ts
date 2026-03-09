// Auto-generated gallery images list
export const galleryImages = Array.from({ length: 199 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/image${String(i).padStart(3, '0')}.png`,
  alt: `Gallery Image ${i + 1}`,
  width: 600,
  height: 600,
}));

export const featuredGalleryImages = galleryImages.slice(0, 12); // First 12 for featured
export const totalImages = galleryImages.length;

export function getImagePath(index: number): string {
  return `/images/gallery/image${String(index).padStart(3, '0')}.png`;
}
