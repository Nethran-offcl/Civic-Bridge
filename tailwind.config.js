/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E1F5EE",
          100: "#9FE1CB",
          500: "#1D9E75",
          600: "#0F6E56",
          900: "#04342C"
        },
        saffron: {
          500: "#FF9933"
        },
        agriculture: "#16a34a",
        health: "#2563eb",
        education: "#7c3aed",
        housing: "#ea580c",
        women: "#db2777",
        skill: "#0891b2",
        pension: "#64748b",
        startup: "#9333ea"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.10)"
      }
    }
  },
  plugins: []
};
