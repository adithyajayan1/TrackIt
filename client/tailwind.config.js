/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your dark theme colors
        'primary-dark': '#1A202C',
        'secondary-dark': '#2D3748',
        'accent-blue': '#4299E1',
        'accent-green': '#48BB78',
        'accent-red': '#F56565',
        'text-light': '#E2E8F0',
        'text-muted': '#A0AEC0',
      },
    },
  },
  plugins: [],
}
