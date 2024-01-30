/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      dropShadow: {
        pop: ['-10px -10px 5px #ffffffcc', '10px 10px 5px #dddde0'],
        concave: ['-5px -5px 10px #ffffffcc', '5px 10px 10px #dddde0'],
      },
    },
  },
  plugins: [],
};
