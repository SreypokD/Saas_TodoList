/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/screens/App/ReadUpdate/todo.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

