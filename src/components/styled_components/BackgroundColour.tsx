// Code copied elsewhere

import { LinearGradient } from "expo-linear-gradient"
import React from "react"

// I forgor which type was the component with child type
type TBackgroundColour = {
  children: string | JSX.Element | JSX.Element[]
}

const BackgroundColour: React.FC<TBackgroundColour> = ({ children }) => {
  return (
    <LinearGradient
      className="h-full"
      colors={["#020235", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {children}
    </LinearGradient>
  )
}

export default BackgroundColour
