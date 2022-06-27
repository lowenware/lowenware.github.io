/** @type {import('tailwindcss').Config} */
const sizes = {
  1:"1px",
  2:"2px",
  4: "4px",
  8: "8px",
  16: "16px",
  24: "24px",
  32: "32px",
  64: "64px",
  72:"72px",
  80: "80px",
  144:"144px",
  288:"288px",
  "slide": "30vh",
};
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {jura: ["Jura"]},
    fontSize: {
      h1: ["4rem", 1],
      h2: ["2.5rem", 1],
      h3: ["2rem", 1],
      small: [".9rem", 1],
      medium: ["1.2rem", 1.5],
      large: ["1.4rem", 1],
    },colors: {
   white:{
    DEFAULT:"#fff"
   },
   dark:{
    DEFAULT:"#192734",
    super:"#001121"
   },
   blue:{
    DEFAULT:"#2098f5",
    super:"#5bd6ff",
    light:"#b9e2ff"
   },
   grey:{
    100:"fafaff",
    200:"#f8f8fc",
    300:"#eceef3",
    500:"#556471",
    600:"#87929a",
    700:"#93999f",
   }
    },
    extend: {
      fill: theme => theme("colors"),
      spacing: sizes,
      scale: {
        "logo": "3",
      },}
  },
  plugins: [],
}
