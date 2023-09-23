import { useEffect, useState } from "react"

const useDebounceValue = <T>(
  init: T,
  delay: number = 50,
): ReturnType<typeof useState<T>> => {
  const [value, setValue] = useState<T | undefined>(init)
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return [debouncedValue, setValue]
}

export default useDebounceValue
