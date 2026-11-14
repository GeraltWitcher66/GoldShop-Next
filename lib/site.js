export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://zaringallery.ir').replace(
  /\/$/,
  ''
);

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function absoluteUrl(path = '/') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${BASE_PATH}${cleanPath}`;
}
