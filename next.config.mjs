/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Only use basePath in production for GitHub Pages deployment
  basePath: isProd ? '/demo' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure the basePath is available in client-side code
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/demo' : '',
  },
};

export default nextConfig;
