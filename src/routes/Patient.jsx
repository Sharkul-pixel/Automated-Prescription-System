import { useLoaderData, useNavigate } from "react-router-dom";

export async function loader({ params }) {
  let patients = localStorage.getItem("patients") ?? [];
  patients = JSON.parse(patients);
  const patient = patients.find((patient) => patient.id === params.patientId);
  return { patient };
}

export default function Patient() {
  const { patient } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div key={patient.id}>
      <button
        className="border"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <div>
        {patient.firstName} {patient.lastName}
      </div>
      <span>{patient.phoneNumber}</span>
    </div>
  );
}
