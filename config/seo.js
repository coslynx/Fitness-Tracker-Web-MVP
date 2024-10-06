const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'] // Add domains for images from external services 
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    HOTJAR_ID: process.env.HOTJAR_ID,
    HOTJAR_SNIPPET_VERSION: process.env.HOTJAR_SNIPPET_VERSION
  }
}

module.exports = nextConfig