/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#141516",
        smoke: "#e6e2dd",
        canvas: "#f7f2ec",
        clay: "#d9c7b6",
        ember: "#e26d5c",
        teal: "#2d6a6a",
        moss: "#3d5a3c"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(226, 109, 92, 0.25)",
        lift: "0 24px 50px rgba(20, 21, 22, 0.18)"
      }
    }
  },
  plugins: []
};
