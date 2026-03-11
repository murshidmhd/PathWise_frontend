import api, { setAccessToken } from "../../services/api";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = useLogout();

  // const handleClick = async () => {
  //   const token = localStorage.getItem("access");
  //   try {
  //     await api.post(
  //       "http://127.0.0.1:8000/api/auth/logout/",
  //       {},
  //       token
  //         ? {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         : {},
  //     );
  //     localStorage.removeItem("role", "student");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   } finally {
  //     setAccessToken("");
  //     navigate("/auth/login", { replace: true });
  //   }
  // };

  return (
    <div className="min-h-screen bg-page-bg font-body text-text-primary">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="flex flex-col border-r border-border bg-white p-6">
          <h1 className="mb-8 font-heading text-2xl font-extrabold">
            PathWise
          </h1>
          <nav className="space-y-2">
            <button className="w-full rounded-lg bg-primary/10 px-4 py-2 text-left font-semibold text-primary">
              Dashboard
            </button>
            <button className="w-full rounded-lg px-4 py-2 text-left text-text-secondary hover:bg-page-bg">
              Assessments
            </button>
            <button className="w-full rounded-lg px-4 py-2 text-left text-text-secondary hover:bg-page-bg">
              Roadmap
            </button>
            <button
              className="w-full rounded-lg px-4 py-2 text-left text-text-secondary hover:bg-page-bg"
              onClick={() => navigate("/student/profile")}
            >
              Profile
            </button>
          </nav>

          <button
            className="mt-auto rounded-lg border border-border px-4 py-2 text-left font-medium text-text-secondary hover:bg-page-bg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </aside>

        <main className="p-6 lg:p-8">
          <header className="mb-8">
            <h2 className="font-heading text-3xl font-bold">
              Student Dashboard
            </h2>
            <p className="mt-2 text-text-secondary">
              Welcome back. Here is your quick overview.
            </p>
          </header>

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <p className="text-sm text-text-secondary">Completed Tasks</p>
              <p className="mt-2 text-2xl font-bold">12</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <p className="text-sm text-text-secondary">Upcoming Sessions</p>
              <p className="mt-2 text-2xl font-bold">3</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <p className="text-sm text-text-secondary">Career Match</p>
              <p className="mt-2 text-2xl font-bold">87%</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
              <p className="text-sm text-text-secondary">Roadmap Progress</p>
              <p className="mt-2 text-2xl font-bold">56%</p>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-heading text-lg font-bold">Next Step</h3>
              <p className="mt-2 text-text-secondary">
                Complete your aptitude quiz to unlock personalized college
                recommendations.
              </p>
              <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
                Continue Quiz
              </button>
            </div>

            <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-heading text-lg font-bold">
                Recent Activity
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                <li>Profile updated</li>
                <li>Roadmap step 4 completed</li>
                <li>Mentor session scheduled</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
