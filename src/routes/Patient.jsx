import { useRef } from "react";
import toast from "react-hot-toast";
import {
  Form,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
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

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const textareaRef = useRef();

  console.log(searchParams);

  return (
    <>
      <div className="h-[92vh]">
        <div
          className="flex h-[4.5rem] items-center"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%234a9bff' fill-opacity='0.48' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          }}
        >
          <button
            className="mx-2 rounded-lg border border-2 border-slate-300 bg-white px-6 py-2 hover:bg-slate-100"
            type="button"
            onClick={() => {
              navigate(searchParams.get("returnUrl") ?? -1);
            }}
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
        <div className="flex">
          <div className="flex w-2/5 flex-col">
            <div className="h-1/2 border-r border-t border-slate-400 p-2">
              <Outlet />
            </div>
            <Form
              className="h-1/2 border-r border-t border-slate-400 p-2"
              method="post"
            >
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
                className="mt-2 rounded border border-2 border-[#3a92ff] bg-[#4a9bff] px-8 py-1.5 text-white hover:bg-[#2989ff]"
                type="submit"
              >
                Send
              </button>
            </Form>
          </div>
          <div className="h-[calc(92vh_-_4.5rem)] w-3/5 overflow-y-auto border-t border-slate-400">
            <div className="flex">
              <div className="w-2/5 border-b border-r border-slate-400 p-2 px-3 font-semibold">
                Timestamp
              </div>
              <div className="w-3/5 border-b border-r border-slate-400 p-2 px-3 font-semibold">
                Message
              </div>
            </div>
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex border-b border-slate-300"
                >
                  <div className="w-2/5 px-3 py-2">
                    {new Date(message.createdAt).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="w-3/5 px-3 py-2">{message.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
