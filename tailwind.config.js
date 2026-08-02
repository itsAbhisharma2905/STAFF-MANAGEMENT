/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cabinet Grotesk", "Inter", "system-ui", "sans-serif"],
        sans: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        emeraldInk: "#0f3f32",
        moss: "#4f7f58",
        fern: "#799b63",
        stone: "#e8e1d4",
        paper: "#f6f2ea",
        soil: "#3f352d",
        graphite: "#242823",
        clay: "#b66645",
        amberLine: "#d8a24c"
      },
      boxShadow: {
        hairline: "0 1px 0 rgba(36,40,35,0.08)",
        lift: "0 10px 28px rgba(15,63,50,0.10)"
      }
    }
  },
  plugins: []
};
