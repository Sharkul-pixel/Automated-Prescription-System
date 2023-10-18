import { redirect, Form, useNavigate } from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  const patient = {
    id: crypto.randomUUID(),
    firstName: entries.firstName,
    lastName: entries.lastName,
    phoneNumber: entries.phoneNumber,
  };

  let patients = JSON.parse(localStorage.getItem("patients")) ?? [];
  patients.push(patient);
  localStorage.setItem("patients", JSON.stringify(patients));

  return redirect(`/`);
}

export default function NewPatientForm() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="m-1 bg-slate-500 px-2 text-white"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
      <Form className="m-1 border border-slate-400 p-2" method="post">
        <div>
          <label>First name</label>
          <input
            name="firstName"
            className="border border-slate-400"
            type="text"
          />
        </div>
        <div>
          <label>Last name</label>
          <input
            name="lastName"
            className="border border-slate-400"
            type="text"
          />
        </div>
        <div>
          <label>Phone number</label>
          <input
            name="phoneNumber"
            className="border border-slate-400"
            type="tel"
          />
        </div>
        <button className="rounded bg-blue-600 px-2 text-white" type="submit">
          Add
        </button>
      </Form>
    </>
  );
}
