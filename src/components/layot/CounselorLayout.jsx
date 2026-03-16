import { Outlet } from "react-router-dom";
import { CounselorSidebar } from "../sidebar/CounselorSidebar";

const CounselorLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <CounselorSidebar />

      <main className="flex-1 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default CounselorLayout;
