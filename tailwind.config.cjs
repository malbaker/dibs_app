/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "lm-blue": "#B9D2CE", //light main blue (ex: background homepage color)
        "dm-blue": "#142B4F", //dark main blue (ex: homepage header, logo color)
        accent: "#37CDBE",
        neutral: "#3D4451",
        "base-100": "#FFFFFF",
        info: "#3ABFF8",
        success: "#36D399",
        buttons: "#F0C552", //yellow button color
        error: "#F87272",
      },

      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
