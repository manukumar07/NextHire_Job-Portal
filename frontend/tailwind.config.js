/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        colors: {
          primary: "#1E3A8A", // Navy Blue
          secondary: "#9CA3AF", // Light Gray
          accent: "#F59E0B", // Amber
          background: "#F9FAFB", // Off-White
          text: "#111827", // Charcoal Black
        },
        fontFamily: {
          sans: ["Lato", "sans-serif"], // Set Lato as the default sans-serif font
        },
      },
    },
  },
  plugins: [],
};
