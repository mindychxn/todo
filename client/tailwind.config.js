/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
    extend: {
      dropShadow: {
        pop: ['-5px -5px 3px #ffffff', '5px 5px 3px #c3c3c9'],
      },
      boxShadow: {
        inset: ['3px 3px 5px #c3c3c9 inset, -3px -3px 5px #ffffff inset'],
        pop: ['-3px -3px 5px #ffffff', '3px 3px 5px #c3c3c9'],
      },
    },
  },
  plugins: [],
};
