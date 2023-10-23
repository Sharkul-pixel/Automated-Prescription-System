import { Outlet } from "react-router-dom";

export default function HeaderAndSidebar() {
  return (
    <>
      <header className="flex border border-b-2 py-2">
        <div className="grow">header</div>
        <div className="mr-2">&lt;header element 1&gt;</div>
        <div className="mr-2">&lt;header element 2&gt;</div>
      </header>
      <div className="flex min-h-screen">
        <aside className="w-1/4 border-r-2">
          sidebar
          <div className="m-4 flex items-center rounded-lg border border-slate-400 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span>Patients</span>
          </div>
          <div className="m-4 flex items-center rounded-lg border border-slate-400 py-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>History</span>
          </div>
        </aside>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
