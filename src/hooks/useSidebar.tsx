import { IconQrcode } from "@tabler/icons-react"
import { useState } from "react"

const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const sectionsIcons = {
    qrs: <IconQrcode />
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