import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md font-inter">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-2 flex items-center justify-between">
        <div
          className="flex items-center"
          onClick={() => {
            router.push("/volunteer");
          }}
        >
          <img
            src="/assets/ZubinFoundationLogo.png"
            alt="Zubin Logo"
            className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] object-contain"
          />
          <span className="ml-2 sm:ml-4 text-lg sm:text-xl font-bold hover:text-red">
            The Zubin Foundation
          </span>
        </div>

        {/* Combined Navigation Links and Profile Icon */}
        <div className="hidden md:flex items-center justify-end space-x-10 sm:space-x-14 lg:space-x-20 text-gray-700">
          <a href="/volunteer/calendar" className="hover:text-red">
            My Calendar
          </a>
          <a href="/volunteer/events" className="hover:text-red">
            Events
          </a>
          <a href="/volunteer/train" className="hover:text-red">
            Trainings
          </a>
          <a href="#" className="hover:text-red">
            Contacts
          </a>

          <FaUserCircle className="text-black w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <FaUserCircle className="text-black w-8 h-8 mr-2 cursor-pointer" />
          <FaBars
            className="text-gray-700 w-8 h-8 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 mt-2 text-gray-700">
          <a href="#" className="hover:text-red-500">
            My Calendar
          </a>
          <a href="#" className="hover:text-red-500">
            Events
          </a>
          <a href="#" className="hover:text-red-500">
            Appointments
          </a>
          <a href="#" className="hover:text-red-500">
            Contacts
          </a>
        </div>
      )}
    </nav>
  );
}
