/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    ACCESS_TOKEN_SECRET :"3AHa9ZXRmGcuj4pN1qae25JgSsVtGA4ekRNgep47BAdKTrCJ74wd4qwd948qd4qw9d4qwd9",
REFRESH_TOKEN_SECRET :"3AHa9ZXRmGcuj4pN1qae25JgSsVtGA4ekRNgep47BAdKTrCJ7yzhu4p4e8lg0nnuct6e9fue8lyxqggwdwdwdwdw"
  },
  async rewrites() {
    return {
  fallback: [
    // These rewrites are checked after both pages/public files
    // and dynamic routes are checked
    {
      source: '/:path*',
      destination: `http://localhost:5000/:path*`,
    },
    {
      source: '/api/search',
      destination: `http://localhost:5000/api/search`,
    },
    {
      source: '/profile/:path*',
      destination: `http://localhost:5000/profile/:path*`,
    },
  
    {
      source: '/api/search/:path*',
      destination: `http://localhost:5000/api/search/:path*`,
    },
    {
      source:  "/api/search/:id/editprofile/follow",
      destination: `http://localhost:5000/api/search/:id/editprofile/follow`,
    },
  ],}}
      
}

module.exports = nextConfig
