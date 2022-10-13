/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/ddd.svg')",
      },
      colors: {
        primary: '#5463FF',
        secondary: '#256D85',
        secondary_light: '#8FE3CF',
        stroke: '#D0D7DE',
        'light-grey': '#F4F4F2',
        'medium-grey': '#BDBDBD',
        'dark-grey': '#595959',
      },
    },
  },
  plugins: [],
};
