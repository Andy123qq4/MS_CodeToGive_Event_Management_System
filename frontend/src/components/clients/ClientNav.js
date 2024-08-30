import { useRouter } from "next/router";
import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const router = useRouter();

  return (
    <nav className="bg-white shadow-md font-inter p-2">
      <div className="cursor-pointer container mx-auto px-4 sm:px-6 py-3 sm:py-2 flex items-center justify-between">
        <div
          className="flex items-center"
          onClick={() => {
            router.push("/client");
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
        <div className="hidden md:flex items-center justify-end space-x-10 sm:space-x-14 lg:space-x-8 text-gray-700">
          <a href="/client/calendar" className="hover:text-red cursor-pointer">
            My Calendar
          </a>
          <a
            href="/client/events"
            className="hover:text-red cursor-pointer p-2"
          >
            Events
          </a>
          <a
            href="/client/appointments"
            className="hover:text-red cursor-pointer p-2"
          >
            Appointments
          </a>
          <a href="#" className="hover:text-red cursor-pointer p-2">
            Contacts
          </a>
          <a
            href="#"
            className="bg-red text-white font-boldcursor-pointer p-2 rounded-sm hover:bg-orange-800"
            onClick={() => router.push("/client/emergency")}
          >
            Emergency
          </a>

          <div className="text-text p-2 pr-0 pl-4">
            <FaUserCircle className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10" />
          </div>
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
            Trainings
          </a>
          <a href="#" className="hover:text-red-500">
            Contacts
          </a>
        </div>
      )}
    </nav>
  );
}
