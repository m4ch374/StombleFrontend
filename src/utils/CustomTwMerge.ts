// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// ts no check for assigning values to readonly field (wack)

import { createTailwindMerge, getDefaultConfig } from "tailwind-merge"

const isNumber = (input: string) => {
  return !Number.isNaN(Number(input))
}

const customTwMerge = createTailwindMerge(() => {
  const conf = getDefaultConfig()
  const original = conf.classGroups["font-size"][0].text
  conf.classGroups["font-size"][0].text = [...original, isNumber]
  return conf
})

export default customTwMerge
