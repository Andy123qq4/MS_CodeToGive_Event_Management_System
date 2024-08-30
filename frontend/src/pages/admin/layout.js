import Sidebar from "../../components/admin/sideBar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
  );
}
