/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#166534', // darker green (green-800)
        primaryLight: '#22c55e', // green-500
        secondary: '#047857', // emerald-700
        bg: '#f0fdf4', // green-50
      }
    },
  },
  plugins: [],
}
