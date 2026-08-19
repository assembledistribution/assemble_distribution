export const getApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  let formatted = envUrl.trim();
  if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
    formatted = `https://${formatted}`;
  }
  return formatted.replace(/\/+$/, '');
};

/**
 * Optimizes image URLs (especially Amazon media links) to load original full HD 1500px images 
 * instead of compressed 160px/320px low-res thumbnails.
 */
export const getHighResImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // Clean Amazon image links
  if (url.includes('amazon.com/images') || url.includes('media-amazon.com')) {
    // Strip Amazon low-res thumbnail modifiers (e.g., ._AC_UL320_, ._AC_SR160,160_, ._SL75_, ._SX300_)
    // and replace with ._AC_SL1500_. for full HD resolution
    return url.replace(/\._[A-Z0-9_,]+_\./gi, '._AC_SL1500_.');
  }

  return url;
};
