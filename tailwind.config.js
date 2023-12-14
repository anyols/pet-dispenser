/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#f3f4f6",
        secondary: "#374151",
        tertiary: "#9ca3af",
        quartiary: "#6b7280",
        quintiary: "#d1d5db",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },

      // #ccfbf1

      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/hero_bg.avif')",
      },
    },
  },
  plugins: [],
};
