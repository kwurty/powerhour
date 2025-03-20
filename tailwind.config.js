/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {

    extend: {
      maxHeight: {
        'vh-minus-256': 'calc(100vh - 150px)', // Custom max-height
      }, colors: {
        'cinnabar': {
          '50': '#fff1f1',
          '100': '#ffdfdf',
          '200': '#ffc5c5',
          '300': '#ff9c9c',
          '400': '#ff6363',
          '500': '#ff3333',
          '600': '#f02828',
          '700': '#c90c0c',
          '800': '#a60e0e',
          '900': '#891313',
          '950': '#4b0404',
        },
      },
    },
  },
  plugins: [],
}
