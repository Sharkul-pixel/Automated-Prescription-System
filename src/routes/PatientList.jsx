import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:3000/patients");
  const json = await response.json();
  return { patients: json };
}

export default function PatientList() {
  const { patients } = useLoaderData();

  return (
    <div>
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
