/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/ddd.svg')",
      },
      colors: {
        primary: '#002B5B',
        tertiary: '#607EAA',
        secondary: '#256D85',
        secondary_light: '#8FE3CF',
      },
    },
  },
  plugins: [],
};
