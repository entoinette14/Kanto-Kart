/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#518535",
        "brand-dark-green": "#3E5F44",
        "brand-yellow": "#FFC519",
        "brand-orange": "#DB5717",
        "brand-peach": "#F8B892",
        "brand-mint": "#BFE9D0",
        "brand-purple": "#922CFF",
        "brand-pink": "#B30B57",
        "brand-red": "#FF4D4D",
      },
    },
  },
  plugins: [],
}
