import { useRef } from "react";
import toast from "react-hot-toast";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

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

  toast.success("Message sent!");

  return redirect(`/patients/${params.patientId}`);
}

export default function Patient() {
  const { patient, messages } = useLoaderData();
  const navigate = useNavigate();

  const textareaRef = useRef();

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
      <div key={patient.id} className="flex">
        <div>
          <h1 className="text-3xl">
            Name: {patient.firstName} {patient.lastName}
          </h1>
          <span>Phone number: {patient.phoneNumber}</span>
        </div>
        <Link
          to={`/patients/${patient.id}/edit`}
          className="mx-3 mt-3 h-fit w-fit rounded border border-slate-500 px-4 py-1"
        >
          Edit
        </Link>
      </div>
      <div className="flex">
        <div>
          <Form className="mx-3 mt-5" method="post">
            <div className="flex w-full flex-col">
              <button
                className="mb-2 w-fit rounded border border-slate-500 px-3 py-1"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  textareaRef.current.value = `Hello, ${patient.firstName}. Your prescription is ready for pickup at _ Pharmacy. For any questions, please contact us at _.`;
                }}
              >
                Fill
              </button>
              <textarea
                ref={textareaRef}
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
        </div>
        <div className="m-2 mt-5 grow rounded border border-slate-300">
          <div className="flex">
            <div className="w-1/2 border border-slate-300 p-2 px-3">
              Timestamp
            </div>
            <div className="w-full border border-slate-300 p-2 px-3">
              Message
            </div>
          </div>
          {messages.map((message) => {
            return (
              <div key={message.id} className="flex border border-slate-300">
                <div className="w-1/2 px-3 text-sm">{message.createdAt}</div>
                <div className="w-full px-3">{message.body}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
