export default function Navbar() {
  return (
    <nav
      className={`border-b-2 text-white border-b-[rgba(255,255,255,0.1)] 
        flex justify-between flex-grow h-[71px] ml-4 py-2.5 items-center max-[660px]:ml-0`}
    >
      <div className="flex flex-col max-[560px]:hidden">
        <h3>Bienvenido</h3>
        {/* <Clock /> */}
      </div>
      <div className="min-[561px]:hidden flex gap-4">
        <figure>
          <img src="" alt="" />
        </figure>
        <div className="flex flex-col">
          <h3>Bienvenido</h3>
          <span className="text-xs">Admin</span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <ul className="flex gap-6 text-[13px] font-normal max-[660px]:hidden">
          <li className="flex gap-2 items-center relative">
            Comunicados
          </li>
          <li>
            Soporte
          </li>
          <div>
            <figure>
              <img src="" alt="" />
            </figure>
            :
          </div>
        </ul>
      </div>
    </nav>
  )
}