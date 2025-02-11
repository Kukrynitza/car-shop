export default {
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb'
    }
  },
  images: {
    remotePatterns: [{
      hostname: 'images.unsplash.com',
      protocol: 'https'
    }]
  }
}
