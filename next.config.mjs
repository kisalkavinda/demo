/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/demo',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/demo',
  },
};

export default nextConfig;
