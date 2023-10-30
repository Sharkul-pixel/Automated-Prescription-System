import { useEffect } from "react";
import {
  Link,
  useLoaderData,
  useSubmit,
  Form,
  useLocation,
} from "react-router-dom";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";

  const response = await fetch(`http://localhost:3000/patients?q=${q}`);
  const json = await response.json();

  return { patients: json, q };
}

export default function Patients() {
  const { patients, q } = useLoaderData();
  const location = useLocation();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <div>
      <div
        className="flex h-[4.5rem] items-center"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%234a9bff' fill-opacity='0.48' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <div className="w-1/3">
          <Form method="get">
            <input
              className="mx-2 w-full rounded rounded-lg border border-2 border-slate-300 px-2.5 py-2"
              type="search"
              name="q"
              id="q"
              placeholder="Search"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
          </Form>
        </div>
        <div className="mx-2 w-fit">
          <Link to={`/patients/new`}>
            <button className="m-2 flex items-center rounded-lg border border-2 border-[#3a92ff] bg-[#4a9bff] px-6 py-2 text-white hover:bg-[#2989ff]">
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
        </div>
      </div>
      <div className="flex font-semibold">
        <div className="w-1/12 border-y border-r border-slate-400 p-2 px-5"></div>
        <div className="w-1/4 border-y border-r border-slate-400 p-2 px-5">
          First Name
        </div>
        <div className="w-1/4 border-y border-r border-slate-400 p-2 px-5">
          Last Name
        </div>
        <div className="w-1/4 border-y border-r border-slate-400 p-2 px-5">
          Phone Number
        </div>
        <div className="grow border-y border-slate-400 p-2 px-4"></div>
      </div>
      {patients.map((patient) => {
        return (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            state={{ returnUrl: location.pathname }}
          >
            <div
              className="flex cursor-pointer border-b border-slate-300 py-2 hover:bg-slate-50"
              key={patient.id}
            >
              <div className="w-1/12 px-5"></div>
              <div className="w-1/4 px-5">{patient.firstName}</div>
              <div className="w-1/4 px-5">{patient.lastName}</div>
              <div className="w-1/4 px-5">{patient.phoneNumber}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
