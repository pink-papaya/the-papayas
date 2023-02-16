/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    require('@tailwindcss/forms'),
  ],
};
