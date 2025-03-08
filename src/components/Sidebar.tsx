import { Link } from "react-router-dom"
import useSidebar from "../hooks/useSidebar"
import { SECTION_NAME } from "../config/constans"
import OPEN_ICON from "../assets/openIcon.png"
import CLOSE_ICON from "../assets/closeIcon.png"
import React from "react"

export default function Sidebar({
  setCurrentSection,
  currentSection
}: {
  currentSection: string,
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>
}) {
  const {
    isExpanded,
    toggleSidebar,
    sectionsIcons
  } = useSidebar()

  return (
    <nav className={`border sidebar rounded-xl p-2 flex-shrink-0 ${
        isExpanded ? 'w-52': 'w-[68px]'
      } transition-all duration-300 overflow-hidden h-[calc(100dvh-1.75rem)] flex flex-col max-[660px]:hidden`}>
      <div className="h-[48px] flex text-white gap-3 justify-start items-start mb-2">
        <figure>
          <img src="" alt="" className="size-12"/>
        </figure>
        {
          isExpanded && (
            <div className="flex flex-col">
              <h2>Admin</h2>
              <span>Administración</span>
            </div>
          )
        }
      </div>
      <div className="w-full border-b-[2px] border-b-[rgba(255,255,255,0.1)]"></div>
      <ul className="flex-grow py-5 flex flex-col gap-3 overflow-hidden">
        {
          Object.entries(SECTION_NAME).map(([key, value]) => (
            <Link
              key={key}
              to={`${key}`}
              onClick={() => setCurrentSection(SECTION_NAME[key as keyof typeof SECTION_NAME])}
              className={`${currentSection === SECTION_NAME[key as keyof typeof SECTION_NAME] ? 'bg-[#7A3FE2] rounded-2xl ' : ''} w-full cursor-pointer flex`}
            >
              <li
                className={`text-white flex items-center w-full h-10 ${isExpanded ? 'px-2 gap-2' : 'justify-center'}`}
              >
                <figure>
                  {/* //! Aqui va el icono, en el hook tienes la constante */}
                  <img src={sectionsIcons[key as keyof typeof sectionsIcons]} alt="" className="size-4"/>
                </figure>
                <span className="text-sm">{ isExpanded && value }</span>
                {/* { // * Si quieres notificaciones creas el componente Badge
                  isExpanded && 2 && badgeNotification[Key as keyof typeof badgeNotification] && <Badge showBadge={true} showBadgeNumber={2} showBadgeColor="red"/>
                } */}
              </li>
            </Link>
          ))
        }
      </ul>
      <div className="w-full border-b-[2px] border-b-[rgba(255,255,255,0.1)]"></div>
      <div className={`text-white flex items-center ${
        isExpanded ? '' : 'justify-center'
      } gap-2 my-2`}>
        { isExpanded ? (
          <figure className="cursor-pointer">
            <img src={OPEN_ICON} alt="" onClick={toggleSidebar}/>
          </figure>
        )
          : (
            <figure className="cursor-pointer">
              <img src={CLOSE_ICON} alt="" onClick={toggleSidebar}/>
            </figure>
          )
        }
        { isExpanded && <span>Acortar panel</span>}
      </div>
    </nav>
  )
}