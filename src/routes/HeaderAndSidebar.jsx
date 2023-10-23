import { NavLink, Outlet } from "react-router-dom";

export default function HeaderAndSidebar() {
  return (
    <>
      <header className="flex border border-b-2 py-2">
        <div className="grow">header</div>
        <div className="mr-2">&lt;header element 1&gt;</div>
        <div className="mr-2">&lt;header element 2&gt;</div>
      </header>
      <div className="flex min-h-screen">
        <aside className="w-1/4 border-r-2 bg-[#f3f4f6]">
          <span>sidebar</span>
          <NavLink
            to={`/patients`}
            className={({ isActive }) =>
              `item-center flex border border-slate-300 py-2 ${
                isActive && "bg-[#d7dae1]"
              }`
            }
          >
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
          </NavLink>
          <NavLink
            to={`/messages`}
            className={({ isActive }) =>
              `item-center flex border border-slate-300 py-2 ${
                isActive && "bg-[#d7dae1]"
              }`
            }
          >
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
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            <span>Messages</span>
          </NavLink>
        </aside>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
