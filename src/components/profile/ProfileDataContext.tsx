// Bandaid fix for the circular import issue
// Prop drilling is an anti-pattern in react navigation

// TODO: introduce structure after custom animated scroll refresh

import { createContext } from "react"
import { TGetFollowings } from "types/endpoints"

const DataContext = createContext<TGetFollowings["responseType"]>({
  result: [],
})

export default DataContext
