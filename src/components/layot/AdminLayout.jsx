import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../sidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AdminSidebar />
      <main className="min-h-screen pt-[140px] lg:ml-72 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
