import { Dispatch, SetStateAction, createContext } from "react"

type THomeModalControllerContext = {
  shareModal: Dispatch<SetStateAction<boolean>>
  moreModal: Dispatch<SetStateAction<boolean>>
}

const HomeModalControllerContext = createContext<THomeModalControllerContext>({
  shareModal: () => {},
  moreModal: () => {},
})

export default HomeModalControllerContext
