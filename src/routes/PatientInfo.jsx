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
      <div className="mx-1 mb-4 flex items-center">
        <span className="grow font-semibold">Patient Information</span>
        <Link
          to={`/patients/${patient.id}/edit`}
          className="flex h-fit w-fit rounded border border-slate-300 p-2 py-1 text-slate-600 hover:bg-slate-100"
          state={{ returnUrl: location.state?.returnUrl }}
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </div>
      <div className="mx-1 mb-4 flex items-center">
        <div className="w-1/3">
          <label>First name</label>
        </div>
        <div className="w-2/3">
          <input
            name="firstName"
            className="w-full rounded border border-slate-400 bg-slate-50 p-2 py-1"
            type="text"
            value={patient.firstName}
          />
        </div>
      </div>
      <div className="mx-1 mb-4 flex items-center">
        <div className="w-1/3">
          <label>Last name</label>
        </div>
        <div className="w-2/3">
          <input
            name="lastName"
            className="w-full rounded border border-slate-400 bg-slate-50 p-2 py-1"
            type="text"
            value={patient.lastName}
          />
        </div>
      </div>
      <div className="mx-1 mb-4 flex items-center">
        <div className="w-1/3">
          <label>Phone number</label>
        </div>
        <div className="w-2/3">
          <input
            name="phoneNumber"
            className="w-full rounded border border-slate-400 bg-slate-50 p-2 py-1"
            type="tel"
            value={patient.phoneNumber}
          />
        </div>
      </div>
    </>
  );
}
