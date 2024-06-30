import { useEffect, useRef } from "react"

const useOutsideClick = (callback: () => void) => {

  const elementRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (event: MouseEvent) => {
    if(elementRef.current && !elementRef.current.contains(event.target as Node)) {
      callback()
    }
  }

  useEffect(() => {

    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick)
    }

  })

  return elementRef

}

export default useOutsideClick