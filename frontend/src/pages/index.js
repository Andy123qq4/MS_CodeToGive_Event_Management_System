import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div>
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
          <div className="hidden md:flex items-center justify-end space-x-10 sm:space-x-14 lg:space-x-8 text-gray-700">
            <a
              href="/client/calendar"
              className="hover:text-red cursor-pointer"
            >
              About Us
            </a>
            <a
              href="/client/events"
              className="hover:text-red cursor-pointer p-2"
            >
              Our Work
            </a>
            <a
              href="/client/appointments"
              className="hover:text-red cursor-pointer p-2"
            >
              Get Involved
            </a>
            <a href="#" className="hover:text-red cursor-pointer p-2">
              News
            </a>
            <a href="#" className="hover:text-red cursor-pointer p-2">
              Contact
            </a>
            <a
              href="#"
              className="bg-primary font-bold cursor-pointer p-2 rounded-sm hover:bg-orange-300 w-28"
            >
              Donate Now
            </a>
            <a
              href="#"
              className="bg-gray-100 font-bold cursor-pointer p-2 border border-gray-200 rounded-sm hover:bg-gray-300 w-28 flex justify-center"
              onClick={() => router.push("/login")}
            >
              Login
            </a>
          </div>
        </div>
      </nav>
      <img src="/images/landing_img.png" className="w-full" />
    </div>
  );
}
