import { Link, useLoaderData, useLocation } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/patients/${params.patientId}`,
  );
  const patient = await response.json();

  return { patient };
}

export default function PatientInfo() {
  const { patient } = useLoaderData();
  const location = useLocation();

  return (
    <>
      <div>
        <h1 className="text-2xl">
          {patient.firstName} {patient.lastName}
        </h1>
        <span>Phone number: {patient.phoneNumber}</span>
      </div>
      <Link
        to={`/patients/${patient.id}/edit`}
        className="mx-3 mt-3 h-fit w-fit rounded border border-slate-500 px-4 py-1"
        state={{ returnUrl: location.state?.returnUrl }}
      >
        Edit
      </Link>
    </>
  );
}
