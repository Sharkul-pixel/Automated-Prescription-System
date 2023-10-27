import { useLoaderData } from "react-router-dom";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ?? "1";

  const paramsObj = { include: "patient", page };
  const searchParams = new URLSearchParams(paramsObj);

  console.log(params);
  const response = await fetch(
    `http://localhost:3000/messages?${searchParams}`,
  );

  const json = await response.json();
  return { messages: json };
}

export default function Messages() {
  const { messages } = useLoaderData();
  return (
    <div>
      <div className="mb-[56px]">{/* whitespace */}</div>
      <div className="flex">
        <div className="w-1/4 border border-slate-300 p-2 px-3">Timestamp</div>
        <div className="w-1/6 border border-slate-300 p-2 px-3">
          Patient Name
        </div>
        <div className="w-1/5 border border-slate-300 p-2 px-3">
          Patient Phone Number
        </div>
        <div className="w-1/3 border border-slate-300 p-2 px-3">Message</div>
        <div className="grow border border-slate-300 p-2 px-3"></div>
      </div>
      {messages.map((message) => {
        return (
          <div className="flex border border-slate-300 py-2" key={message.id}>
            <div className="w-1/4 px-3">{message.createdAt}</div>
            <div className="w-1/6 px-3">
              {message.patient.firstName + " " + message.patient.lastName}
            </div>
            <div className="w-1/5 px-3">{message.patient.phoneNumber}</div>
            <div className="w-1/3 px-3">{message.body}</div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}
