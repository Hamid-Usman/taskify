/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      primary: '#F28F3B', //grape
      accent: '#9DB4C0', //battleship gray
      accent_low: '#3C484E',
      secondary: '#1B2228', //rich dark
      white: '#F7F7F7', //seasalt
      gray: '#545454',
      primary_low: '#f2903bd5'
    },
    extend: {},
  }
}

//#5B85AA