/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "10px 15px 15px rgba(1, 0, 0, 0.25)",
      },
      fontFamily: {
        Lato: "Lato-400",
        LatoBold: "Lato-700",
        LatoBlack: "Lato-900",
        Roboto: "Roboto-400",
        AT: "AT",
      },
      colors: {
        // brand color
        primary: "#0B52BC",
        secondary: "326FCB",
        // btn color
        btnRecording: "#FF6961",
        btnActive: "#0B52BC",
        btnDisabled: "#454545",
        btnSelect: "#326FCB",
        btnDefault: "#4F4F4F",
        btnSecondaryDefault: "rgba(199, 199, 199, 0.3)",
        // content color
        textPri: "#FFFFFF",
        textSec: "#326FCB",
        textTert: "rgba(255, 255, 255, 0.6)",
        suggestive: "rgba(193, 193, 193, 0.6)",
        settingCateg: "#ADADAD",
        // text field
        main: "#4F4F4F",
        bgText: "#101035",
        stroke: "#808080",
        // background color
        bgProfile: "#02022F",
        bgSetting: "#080816",
        bgShareSheet: "#1C1C1E",
        bgTabBar: "#10102C",
        background: "#020230",
        // others
        black: "#000",
        white: "#fff",
        error: "#F4222F",
        confirm: "#00CA23",
      },
    },
  },

  plugins: [],
}
