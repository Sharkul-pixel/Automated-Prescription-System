import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function HeaderAndSidebar() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            boxShadow: "unset",
            border: "1px solid gray",
          },
        }}
      />
      <header className="flex border border-b-2 py-2">
        <div className="grow">header</div>
        <div className="mr-2">&lt;header element 1&gt;</div>
        <div className="mr-2">&lt;header element 2&gt;</div>
      </header>
      <div className="flex min-h-screen">
        <aside className="w-1/4 bg-slate-100">
          <span>sidebar</span>
          <NavLink
            to={`/patients`}
            className={({ isActive }) =>
              `item-center flex border border-slate-300 py-4 ${
                isActive && "bg-slate-200"
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
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Patients</span>
          </NavLink>
          <NavLink
            to={`/messages`}
            className={({ isActive }) =>
              `item-center flex border border-slate-300 py-4 ${
                isActive && "bg-slate-200"
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
