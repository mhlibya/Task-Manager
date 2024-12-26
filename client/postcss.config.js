export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  server: {
  '/api': {
    target: 'https://localhost:3000',
    chageOrigin: true
    }
  }
}
