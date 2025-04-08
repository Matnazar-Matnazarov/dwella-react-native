/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#6B7280',
        accent: '#FBBF24',
        background: '#F9FAFB',
        card: '#FFFFFF',
        text: '#1F2937',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
}

