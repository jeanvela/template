import { useState } from "react"
import { SECTION_NAME } from "../../../config/constans"

const useRoot = () => {
  const [currentSection, setCurrentSection] = useState(SECTION_NAME.qrs)

  return {
    currentSection,
    setCurrentSection
  }
}

export default useRoot