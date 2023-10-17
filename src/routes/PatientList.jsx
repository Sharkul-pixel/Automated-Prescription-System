import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const patients = localStorage.getItem("patients");
  return { patients: JSON.parse(patients) ?? [] };
}

export default function PatientList() {
  const { patients } = useLoaderData();

  return (
    <div>
      {patients.map((patient) => {
        return (
          <Link to={`/patients/${patient.id}`}>
            <div
              className="my-1 cursor-pointer border border-slate-600 py-2 hover:bg-blue-50"
              key={patient.id}
            >
              <span>{patient.firstName}</span>
              &nbsp;
              <span>{patient.lastName}</span>
              &nbsp;
              <span>{patient.phoneNumber}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
