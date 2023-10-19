import { useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/patients/${params.patientId}`,
  );
  const json = await response.json();
  return { patient: json };
}

export default function Patient() {
  const { patient } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div key={patient.id}>
      <button
        className="m-1 bg-slate-500 px-2 text-white"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <h1 className="text-3xl">
        Name: {patient.firstName} {patient.lastName}
      </h1>
      <span>Phone number: {patient.phoneNumber}</span>
    </div>
  );
}
