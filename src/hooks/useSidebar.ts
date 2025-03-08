import { useState } from "react"

const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionsIcons = {
    transactions: '',
  }

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return {
    isExpanded,
    toggleSidebar,
    sectionsIcons
  }
}

export default useSidebar