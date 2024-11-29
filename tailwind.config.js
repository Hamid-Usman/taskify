/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      primary: '#9A00BD', //grape
      accent: '#BEBFC5', //battleship gray
      accent_low: '#bebfc563',
      secondary: '#010B13', //rich dark
      white: '#F7F7F7', //seasalt
      primary_low: '#592a85'
    },
    extend: {},
  }
}

