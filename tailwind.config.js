/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "white-blur": "hsl(0,0%,100%,0.7)",
        "black-blur": "hsl(0,0%,6%,0.7)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
