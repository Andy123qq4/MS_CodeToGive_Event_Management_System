import AppointInfo from "@/components/admin/appointments/AppointInfo";
import Appointment from "@/components/admin/appointments/Appointment";
import RequestAppointment from "@/components/admin/appointments/RequestAppointment";
import Sidebar from "@/components/admin/sideBar";
import MainHead from "@/components/admin/ui/MainHead";
import SectionHead from "@/components/admin/ui/SectionHead";

export default function AppointmentPage() {
  return (
    <div className="flex mb-32">
      <Sidebar />
      <div className="w-full flex flex-col">
        <MainHead
          title="Manage Appointments"
          b1="Your Appointment"
          b2="Draft Appointment"
          b3="Appointment Slots"
          b4="Filter"
        />
        <div className="mb-16">
          <SectionHead>Requested Appointments</SectionHead>
          <RequestAppointment
            title="Appointment by Ammy"
            status="pending"
            date="Sun, Jul 28, 2024"
            time="10:00 AM"
            location="Sham Shui Po "
            img="/images/kayaking.jpg"
          />
        </div>
        <div className="mb-16">
          <SectionHead>Upcoming Appointments</SectionHead>
          <Appointment
            title="Appointment by Ammy"
            status="accept"
            date="Sun, Jul 28, 2024"
            time="10:00 AM"
            location="Sham Shui Po "
            img="/images/kayaking.jpg"
          />
        </div>
        <div>
          <SectionHead>Pending Appointments</SectionHead>
          <Appointment
            title="Appointment by Ammy"
            status="pending"
            date="Sun, Jul 28, 2024"
            time="10:00 AM"
            location="Sham Shui Po "
            img="/images/kayaking.jpg"
          />
        </div>
      </div>
    </div>
  );
}
