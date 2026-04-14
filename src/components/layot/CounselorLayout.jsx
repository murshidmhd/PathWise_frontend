import { Outlet } from "react-router-dom";
import { CounselorSidebar } from "../sidebar/CounselorSidebar";

const CounselorLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <CounselorSidebar />
      <main className="min-h-screen pt-[138px] lg:ml-[292px] lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default CounselorLayout;
