// components/Sidebar.js
import { useState } from "react";
import Link from "next/link";
import {
  MdPerson,
  MdEvent,
  MdSchedule,
  MdNotifications,
  MdCalendarToday,
  MdMenu,
} from "react-icons/md";
import { Divider, IconButton, Drawer } from "@mui/material";

export default function Sidebar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const sidebarContent = (
    <div className="w-72 h-screen bg-white shadow-md flex flex-col justify-start">
      <div className="p-6">
        <img
          src="/assets/ZubinFoundationLogo.png"
          alt="The Zubin Foundation"
          className="w-16 h-16 object-contain mx-auto"
        />
        <h2
          className="mt-4 text-center font-bold"
          style={{ color: "#000000", fontSize: "20px" }} // Adjusted font size to 20px
        >
          The Zubin Foundation
        </h2>
        <p
          className="text-center font-bold mt-2"
          style={{ color: "#000000", fontSize: "20px" }} // Adjusted font size to 20px
        >
          Welcome Michael!
        </p>
      </div>
      <nav className="flex-1">
        <Divider
          style={{
            backgroundColor: "#585858",
            height: "1px",
            marginTop: "4px",
          }}
        />
        <Link
          href="/admin/profile"
          className="flex items-center py-3 px-6 hover:bg-gray-200 rounded my-3"
          style={{ color: "#585858", fontSize: "1.125rem" }}
        >
          <MdPerson className="mr-4 text-2xl" />
          Profile
        </Link>
        <Divider style={{ backgroundColor: "#585858", height: "1px" }} />
        <Link
          href="/admin/manage-events"
          className="flex items-center py-3 px-6 hover:bg-gray-200 rounded my-3"
          style={{ color: "#585858", fontSize: "1.125rem" }}
        >
          <MdEvent className="mr-4 text-2xl" />
          Manage Events
        </Link>
        <Divider style={{ backgroundColor: "#585858", height: "1px" }} />
        <Link
          href="/admin/manage-appointments"
          className="flex items-center py-3 px-6 hover:bg-gray-200 rounded my-3"
          style={{ color: "#585858", fontSize: "1.125rem" }}
        >
          <MdSchedule className="mr-4 text-2xl" />
          Manage Appointments
        </Link>
        <Divider style={{ backgroundColor: "#585858", height: "1px" }} />
        <Link
          href="/admin/manage-reminders"
          className="flex items-center py-3 px-6 hover:bg-gray-200 rounded my-3"
          style={{ color: "#585858", fontSize: "1.125rem" }}
        >
          <MdNotifications className="mr-4 text-2xl" />
          Manage Reminders
        </Link>
        <Divider style={{ backgroundColor: "#585858", height: "1px" }} />
        <Link
          href="/admin/calendar"
          className="flex items-center py-3 px-6 hover:bg-gray-200 rounded my-3"
          style={{ color: "#585858", fontSize: "1.125rem" }}
        >
          <MdCalendarToday className="mr-4 text-2xl" />
          Calendar
        </Link>
        <Divider style={{ backgroundColor: "#585858", height: "1px" }} />
      </nav>
    </div>
  );

  return (
    <>
      {/* Hamburger menu for mobile screens */}
      <div className="md:hidden p-4">
        <IconButton onClick={toggleDrawer(true)}>
          <MdMenu className="text-3xl text-gray-700" />
        </IconButton>
      </div>

      {/* Sidebar for desktop screens */}
      <div className="hidden md:block">{sidebarContent}</div>

      {/* Drawer for mobile screens */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {sidebarContent}
      </Drawer>
    </>
  );
}
