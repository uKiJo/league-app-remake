/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/layered-steps.svg')",
      },
    },
  },
  plugins: [],
};
