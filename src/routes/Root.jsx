import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-1/4 border-r-2">sidebar</aside>
        <div className="w-3/4">
          <button className="m-2 border bg-slate-500 p-1 text-white">
            <Link to={`/patients/new`}>add new patient</Link>
          </button>
          <hr />
          <button
            onClick={() => {
              setPatients([]);
            }}
          >
            Clear patients
          </button>
          <hr />
          <Outlet />
        </div>
      </div>
    </>
  );
}
