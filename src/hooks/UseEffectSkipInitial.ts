// TODO: lint? idk probably remove
/* eslint-disable */

import React, { useEffect, useRef } from 'react'

// Why are you not using the props whaaaaaat, it
// has been the nth time i saw it
type Props =
{
  func: any
  deps: any
}

const UseEffectSkipInitial = (func: () => boolean | undefined, deps: unknown) => {
  const didMount = useRef(false)
  useEffect(()=>{
    if (didMount.current) {
      func
    } else {
      didMount.current = true
    }
  }, [deps])
}

export default UseEffectSkipInitial