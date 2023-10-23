import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:3000/patients");
  const json = await response.json();
  return { patients: json };
}

export default function Patients() {
  const { patients } = useLoaderData();

  return (
    <div>
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
      <div className="flex">
        <div className="w-1/12 border border-slate-300 p-2 px-3"></div>
        <div className="w-1/6 border border-slate-300 p-2 px-3">First Name</div>
        <div className="w-1/6 border border-slate-300 p-2 px-3">Last Name</div>
        <div className="w-1/6 border border-slate-300 p-2 px-3">
          Phone Number
        </div>
      </div>
      {patients.map((patient) => {
        return (
          <Link key={patient.id} to={`/patients/${patient.id}`}>
            <div
              className="flex cursor-pointer border border-slate-300 py-2 hover:bg-blue-50"
              key={patient.id}
            >
              <div className="w-1/12 px-3"></div>
              <div className="w-1/6 px-3">{patient.firstName}</div>
              <div className="w-1/6 px-3">{patient.lastName}</div>
              <div className="w-1/6 px-3">{patient.phoneNumber}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
