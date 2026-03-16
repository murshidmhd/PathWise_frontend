import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
