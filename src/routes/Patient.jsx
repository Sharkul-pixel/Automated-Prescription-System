import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/patients/${params.patientId}`,
  );
  const json = await response.json();
  return { patient: json };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  console.log(entries);

  await fetch("http://localhost:3000/messages", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  });

  return redirect(`/patients/${params.patientId}`);
}

export default function Patient() {
  const { patient } = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
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
      <Form className="mt-5" method="post">
        <input name="body" className="border border-2" type="text" />
        <button className="border border-2" type="submit">
          Send
        </button>
      </Form>
    </>
  );
}
