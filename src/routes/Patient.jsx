import { useLoaderData, useNavigate, Form, redirect } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/patients/${params.patientId}`,
  );
  const patient = await response.json();

  const response2 = await fetch(
    `http://localhost:3000/patients/${params.patientId}/messages`,
  );
  const messages = await response2.json();

  return { patient, messages };
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
    body: JSON.stringify({
      ...entries,
      patientId: params.patientId,
    }),
  });

  return redirect(`/patients/${params.patientId}`);
}

export default function Patient() {
  const { patient, messages } = useLoaderData();
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
      <div className="flex">
        <Form className="mx-3 mt-5" method="post">
          <div>
            <textarea
              className="rounded border border-2 border-slate-300 p-1 px-2"
              name="body"
              cols="30"
              rows="3"
              placeholder="Enter a message here"
            ></textarea>
          </div>
          <button
            className="mt-2 rounded-lg border border-2 border-[#3a92ff] bg-[#4a9bff] px-8 py-1.5 text-white hover:bg-[#2989ff]"
            type="submit"
          >
            Send
          </button>
        </Form>
        <div className="m-2 mt-5 grow rounded border border-slate-300">
          {messages.map((m) => {
            return <div key={m.id}>{m.body}</div>;
          })}
        </div>
      </div>
    </>
  );
}
