/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        gradient1: "url('/src/assets/Frame1.svg')",
        gradient2:"url('/src/assets/Frame2.svg')"
      },
      colors: {
        babyPink: '#FFD2D8',
        darkPink: '#ffb8c1',
        babyBlue: '#BBE2FF',
        darkBlue: '#9BD5FF',
        babyPurple: '#E1CBFA',
        darkPurple: '#D0A5FF',
        charcoal: '#405064',
        cream: '#FDF7F0',
      },
      dropShadow: {
        pop: ['-5px -5px 3px #ffffff', '5px 5px 3px #c3c3c9'],
      },
      boxShadow: {
        inset: ['3px 3px 5px #c3c3c9 inset, -3px -3px 5px #ffffff inset'],
        pop: ['-3px -3px 5px #ffffff', '3px 3px 5px #c3c3c9'],
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        float1: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
