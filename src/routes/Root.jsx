import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-1/4 border-r-2">sidebar</aside>
        <div className="w-3/4">
          <Link to={`/patients/new`}>
            <button className="m-2 rounded-lg border border-[1.5px] bg-[#4a9bff] px-5 py-1.5 text-white hover:bg-[#2989ff]">
              New patient
            </button>
          </Link>
          <hr />
          <Outlet />
        </div>
      </div>
    </>
  );
}
