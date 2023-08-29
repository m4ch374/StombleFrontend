/* eslint-disable */

/*
 ************************************************
 *               USAGE                          *
 ************************************************

 This file exist as a configurations file for both
 tailwind and non-tailwind supported components

 In ES5 syntax for tailwind config compatibility
 */

// ===============================================
// Imports
// ===============================================
const twcolors = require("tailwindcss/colors")
// ===============================================

/*
 ************************************************
 *               OVERRIDES                      *
 ************************************************

 The following overrides tailwind default options
 */
const colors = {
  transparent: "transparent",

  // =========================================
  // Greyscales
  // =========================================
  white: "#FFF",
  gray: {
    lightest: "#D9D9D9",
    lighter: "#ABABAB",
    mid: "#808080",
    darkest: "#454545",
    "darkest-pro-max": "#222", // Henry humor
  },
  // =========================================

  // =========================================
  // Main UI
  // =========================================
  background: "#060620",
  navbar: "#10102C",
  primary: "#0B52BC",
  secondary: "#326FCB",
  // =========================================

  // =========================================
  // Utility
  // =========================================
  util: {
    error: "#F4222F",
    success: "#00CA23",
    alert: "#CA9D00",
    banner: "#232637",
  },
  // =========================================

  // Providing some simple default colors for quick dev
  slate: twcolors.slate,
  red: twcolors.red,
  orange: twcolors.orange,
  yellow: twcolors.yellow,
  green: twcolors.green,
  blue: twcolors.blue,
  purple: twcolors.purple,
  pink: twcolors.pink,
  black: twcolors.black,
}

const dropShadow = {
  sm: "0 2px 4px rgba(0, 0, 0, 0.25)",
  md: "0 4px 8px rgba(0, 0, 0, 0.4)",
  lg: "0 0 16px rgba(0, 0, 0, 0.7)",
}

const borderRadius = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px", // as per tailwind docs
}

const spacing = {
  defaults: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "40px",
  },
  spacingMultiplier: 2,
}

// ===========================================
// This currently extens the default options
// Will override once fonts are finalized
const fontSize = {
  defaults: {}, // To be finalized
  fontStepsMultiplier: 2, // in px
  defaultStaticLineHeight: "1.2rem",
}
// ============================================

/*
 ************************************************
 *               EXTENDS                        *
 ************************************************

 The following extends the default options in tailwind
 */

 // !!! NOTE: deeply nested fonts are not supoprted yet
const fontFamily = {
  // Lato font
  lato: "Lato-400",
  "lato-bold": "Lato-700",
  "lato-black": "Lato-900",

  // AT font or whatever that is idk
  AT: "AT",
}

module.exports = {
  colors,
  dropShadow,
  borderRadius,
  spacing,
  fontSize,
  fontFamily,
}
