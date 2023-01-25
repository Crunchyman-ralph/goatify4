/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    PUBLIC_URL: process.env.PUBLIC_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },
}
