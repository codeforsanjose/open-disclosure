import { useEffect, useState } from "react"

export default function useWindowIsLarge(size) {
  const [windowIsLarge, setWindowIsLarge] = useState(true)
  const updateWindowDimensions = () => {
    setWindowIsLarge(window.innerWidth >= size)
  }
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions)
    return () => {
      window.removeEventListener("resize", updateWindowDimensions)
    }
  }, [])
  return windowIsLarge
}
