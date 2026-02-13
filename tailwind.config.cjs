/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        love: '#ff4d6d',
        pinky: '#ff8fa3',
        cream: '#fff0f3',
      },
      fontFamily: {
        'lovely': ['"Pacifico"', 'cursive'], // Bạn có thể thêm font này vào index.html
      }
    },
  },
  plugins: [],
}