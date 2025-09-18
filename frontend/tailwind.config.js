
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#9CA3AF",
        accent: "#F59E0B",
        background: "#F9FAFB",
        text: "#111827",
      },
      fontFamily: {
        // Professional font setup for job portal
        sans: ["Inter", "Roboto", "Nunito Sans", "sans-serif"],
        heading: ["Poppins", "Nunito Sans", "Inter", "sans-serif"],
        highlight: ["Montserrat", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg, var(--tw-gradient-stops))",
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        slideRight: "slideRight 0.6s ease-out",
        zoomIn: "zoomIn 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s infinite",
        gradientText: "gradientText 3s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(-30px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        zoomIn: {
          "0%": { transform: "scale(0.95)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(30,58,138, 0.6)" },
          "50%": { boxShadow: "0 0 20px rgba(30,58,138, 0.8)" },
        },
        gradientText: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
