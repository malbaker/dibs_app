/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "lm-blue": "#E3E3E5", //light main blue (ex: background homepage color)
        "dm-blue": "#142B4F", //dark main blue (ex: homepage header, logo color)
        accent: "#37CDBE",
        neutral: "#3D4451",
        "base-100": "#FFFFFF",
        info: "#3ABFF8",
        success: "#36D399",
        buttons: "#66878F", //blueish green button color
        error: "#F87272",
        carousel: "#E4DCBE",
        fonts: "#2F4247",
      },

      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
