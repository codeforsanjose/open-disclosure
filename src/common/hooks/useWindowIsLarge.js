import { useCallback, useEffect, useState } from "react"

const LARGE_WINDOW_SIZE = 760

export default function useWindowIsLarge() {
  const [windowIsLarge, setWindowIsLarge] = useState(
    window.innerWidth >= LARGE_WINDOW_SIZE
  )
  const updateWindowDimensions = useCallback(() => {
    setWindowIsLarge(window.innerWidth >= LARGE_WINDOW_SIZE)
  }, [])
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions)
    return () => {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  }, [updateWindowDimensions])
  return windowIsLarge
}
