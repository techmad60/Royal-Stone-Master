// Header Component
import Navbar from "../ui/Navbar";

export default function Header() {

  return (
    <header className="flex flex-col p-4 sm:px-8 md:px-12 lg:pt-8 lg:px-16 lg:items-center bg-color-two fixed w-full z-50">
        <div className="max-w-[74.5rem] xl:max-w-[74rem] w-full">
          <Navbar/>
        </div>
    </header>
  )
}