/** @type {import('next').NextConfig} */
const nextConfig = {

  images : {
   formats : ['image/avif', 'image/webp'],
   remotePatterns : [
    {
        protocol : 'https',
        hostname : 'cdn.lifestyleasia.com',
        port : '',
        pathname : '/wp-content/uploads/**'
    },
   ],
  },

}

module.exports = nextConfig
