/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow:
      {
        '3xl': '10px 15px 15px rgba(1, 0, 0, 0.25)',
      },
      fontFamily:{
        
      }
    },
  },
  plugins: [],
};

