import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-page-bg">
      <Sidebar />
      <main className="flex-1 lg:ml-[292px]">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
