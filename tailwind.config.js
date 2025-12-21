/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',     // Orange
        accent: '#00D9FF',      // Cyan
        success: '#4ADE80',     // Green
        dark: '#0F0F1E',        // Dark Blue/Black
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
