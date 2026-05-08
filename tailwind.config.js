export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#EFEEEC",
        heading: "#111212",
        nav: "#BEBEBE",
        footer: "#282828",
        mint: "#B2F6E3",

        hoverPink1: "#FECACC",
        hoverPink2: "#FDD8C4",
        hoverPurple: "#D29DD0",
        hoverAsh: "#D8C4FD",
        hoverBlueDark: "#3A8CCB",
        hoverBlueLight: "#60DCFB",
        hoverBlue: "#39B0BD",
        hoverOrange: "#CB7B3A",
        hoverGrayPink: "#D2B59D",
      },
      fontFamily: {
         outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};