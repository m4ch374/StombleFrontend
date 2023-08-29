/* eslint-disable */
/** @type {import('tailwindcss').Config} */

// ====================================================
// Imports
// ====================================================

// In ES5 syntax bc tailwind config only supports ES5
const {
  colors,
  dropShadow,
  borderRadius,
  spacing,
  fontSize,
  fontFamily,
} = require("./style.config")
// =====================================================

const maxStep = 41

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: colors,
    dropShadow: dropShadow,
    borderRadius: borderRadius,
    spacing: {
      ...spacing.defaults,
      ...[...Array(maxStep).keys()].reduce((obj, _, idx) => {
        obj[idx] = `${idx * spacing.spacingMultiplier}px`
        return obj
      }, {}),
    },
    extend: {
      fontFamily: fontFamily,
      fontSize: {
        ...fontSize.defaults,
        ...[...Array(maxStep).keys()].reduce((obj, _, idx) => {
          const key = idx + 1
          obj[key] = [`${key * fontSize.fontStepsMultiplier}px`, fontSize.defaultStaticLineHeight]
          return obj
        }, {}),
      }
    },
  },

  plugins: [],
}
