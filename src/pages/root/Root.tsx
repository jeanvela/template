import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import useRoot from "./hooks/useRoot";

export default function Root() {
  const {
    currentSection,
    setCurrentSection
  } = useRoot()

  return (
    <main className="min-h-dvh p-3 flex relative">
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection}/>
      <section className="flex-grow">
        <Navbar />
        <section className="overflow-y-auto h-[calc(100vh-71px)]">
          <Outlet />
        </section>
      </section>
      {/* //! Aqui iria el BottomNavbar */}
    </main>
  )
}