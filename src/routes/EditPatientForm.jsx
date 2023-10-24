import { useNavigate, useLoaderData, Form } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/patients/${params.patientId}`,
  );
  const patient = await response.json();

  return { patient };
}

export default function EditPatientForm() {
  const { patient } = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <Form method="patch" className="w-1/2 border">
        <div className="flex w-full border">
          <label className="w-1/3">First name</label>
          <input
            className="w-2/3 border"
            type="text"
            name="firstName"
            defaultValue={patient.firstName}
          />
        </div>

        <div className="flex w-full border">
          <label className="w-1/3">Last name</label>
          <input
            className="w-2/3 border"
            type="text"
            name="lastName"
            defaultValue={patient.lastName}
          />
        </div>

        <div className="flex w-full border">
          <label className="w-1/3">Phone number</label>
          <input
            className="w-2/3 border"
            type="tel"
            name="phoneNumber"
            defaultValue={patient.phoneNumber}
          />
        </div>

        <button className="m-1 bg-blue-500 px-2 text-white" type="submit">
          Save
        </button>
        <button
          className="m-1 bg-slate-500 px-2 text-white"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </Form>
    </>
  );
}
