/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      minWidth: {
        key: "45px",
        app: "660px",
      },
      maxWidth: {
        header: "638px",
      },
      width: {
        modal: "546px",
        boardItem: "76px",
        keyboard: "638px",
      },
      height: {
        boardItem: "76px",
        header: "84px",
      },
      colors: {
        // Global
        success: "#6AAA64",
        // Wordle
        boardItemCorrect: "#6AAA64",
        boardItemPresent: "#CEB02C",
        boardItemAbsent: "#939B9F",
        boardItemDefault: "#939B9F4D",
        // Light mode
        light: "#F9F9F9",
        lightModal: "#F3F3F3",
        lightText: "#000000",
        lightBorder: "#000000",
        lightBorderItem: "#000000",
        lightHeaderBg: "#F3F3F3",
        lightHeaderTitle: "#202537",
        lightIcons: "#818181",
        lightKey: "#D3D6DA",
        lightKeyText: "#56575E",
        // Dark mode
        dark: "#262B3C",
        darkModal: "#262B3C",
        darkBorder: "#939B9F",
        darkText: "#FFFFFF",
        darkBorderItem: "#888FB5",
        darkHeaderBg: "#dadce008",
        darkHeaderTitle: "#DADCE0",
        darkIcons: "#DADCE0",
        darkKey: "#565F7E",
        darkKeyText: "#FFFFFF",
      },
      keyframes: {
        translateRight: {
          "0%": { left: "0.25rem" },
          "100%": { left: "50%" },
        },
        translateLeft: {
          "0%": { right: "0.25rem" },
          "100%": { right: "50%" },
        },
      },
      animation: {
        "toggle-to-right": "translateRight 0.3s forwards",
        "toggle-to-left": "translateLeft 0.3s forwards",
      },
    },
  },
  plugins: [],
};
