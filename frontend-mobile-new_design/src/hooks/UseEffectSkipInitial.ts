import React, { useEffect,useRef } from 'react'

type Props=
{
  func: any
   deps: any
}

const UseEffectSkipInitial = (func: () => boolean | undefined,deps: unknown) => {
  const didMount=useRef(false)
  useEffect(()=>{
    if(didMount.current){
      func
    }else{
      didMount.current = true;
    }
  },[deps])
}

export default UseEffectSkipInitial