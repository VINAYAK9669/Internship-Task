/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        gray_hard: "#F9F6FD",
        gray_opacity: "rgba(228, 228, 228, 0.5)",
      },
    },
  },
  plugins: [],
};
