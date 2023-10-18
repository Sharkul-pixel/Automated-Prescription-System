import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header className="border border-b-2 py-2">header</header>
      <div className="flex min-h-screen">
        <aside className="w-1/4 border-r-2">sidebar</aside>
        <div className="w-3/4">
          <Link to={`/patients/new`}>
            <button className="m-2 flex items-center rounded-lg border border-2 border-[#3a92ff] bg-[#4a9bff] px-6 py-1.5 text-white hover:bg-[#2989ff]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="mr-1 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Add patient</span>
            </button>
          </Link>
          <hr />
          <Outlet />
        </div>
      </div>
    </>
  );
}
