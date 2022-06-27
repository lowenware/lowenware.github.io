/** @type {import('tailwindcss').Config} */
const sizes = {
  0:"0",
  1:"1px",
  2:"2px",
  4: "4px",
  8: "8px",
  16: "16px", // sm
  24: "24px", // md
  32: "32px", // lg 
  48:"48px",  // xl
  64: "64px",
  72:"72px",
  80: "80px",
  84: "84px",
  128:"128px",
  256:"256px",
  144:"144px",
  288:"288px",
  640:"640px",
  "slide": "760px",
  "content": "960px",
};
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/layout/**/*.{ts,tsx}"
  ],
  theme: {
    fontFamily: {jura: ["Jura"]},
    fontSize: {
      sm: ["1.3rem", 1.5],
      md: ["1.6rem", 1.5],
      lg: ["1.8rem", 1.5],
      xl: ["2.0rem", 1.5],
      "2xl": ["3.0rem", 1.0],
    },
    minWidth:{
      "200":"200px"
    },
    colors: {
      white: {
        DEFAULT: "#ffffff"
      },
      highlight: {
        DEFAULT: "#e07a5f"
      },
      dark: {
        DEFAULT: "#121417",
      },
      blue: {
        DEFAULT: "#0fb7ff",
      },
      green: {
        DEFAULT: "#4CC900",
        alert: "#d4edda",
        border: "#256333",
      },
      red: {
        alert: "#f8d7da",
        border: "#7e2d35",
      },
      purple: {
        DEFAULT: "#FC71FF",
      },
      grey: {
        DEFAULT: "#eceef3",
        dark: "#d7d7d6",
        100: "#fafaff",
        200: "#f8f8fc",
        300: "#eceef3",
        500: "#556471",
        600: "#87929a",
        700: "#93999f",
      }
    },
    extend: {
      fill: theme => theme("colors"),
      spacing: sizes,
      scale: {
        "logo": "3",
      },
      transitionProperty: {
        "width": "width",
      }
    }
  },
  plugins: [],
}
