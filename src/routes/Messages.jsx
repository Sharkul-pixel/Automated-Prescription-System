import { Link, useLoaderData, useLocation } from "react-router-dom";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);

  const paramsObj = { include: "patient", page };
  const searchParams = new URLSearchParams(paramsObj);

  console.log(params);
  const response = await fetch(
    `http://localhost:3000/messages?${searchParams}`,
  );
  const { messages, numPages } = await response.json();

  return { messages, page, numPages };
}

export default function Messages() {
  const { messages, page, numPages } = useLoaderData();
  const location = useLocation();

  return (
    <div>
      <div
        className="flex h-[4.5rem] items-center"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%234a9bff' fill-opacity='0.48' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <div className="mx-2 flex w-fit items-center rounded-lg border-2 border-slate-300 bg-white px-8 py-1.5">
          <Link
            className={`rounded border border-slate-400 px-2 py-1 hover:bg-blue-50 ${
              page === 1 &&
              "cursor-default border-slate-200 bg-slate-200 text-slate-400 hover:bg-slate-200"
            }`}
            to={page > 1 ? `/messages?page=${page - 1}` : "/messages?page=1"}
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Link>
          <span className="ml-5 w-10 rounded border border-slate-300 py-0.5 text-center">
            {page}
          </span>
          <span className="mx-1 w-6 text-center">of</span>
          <span className="mr-5 w-6 text-center text-slate-600">
            {numPages}
          </span>
          <Link
            className={`rounded border border-slate-400 px-2 py-1 hover:bg-blue-50 ${
              page === numPages &&
              "cursor-default border-slate-200 bg-slate-200 text-slate-400 hover:bg-slate-200"
            }`}
            to={
              page == numPages
                ? `/messages?page=${numPages}`
                : `/messages?page=${page + 1}`
            }
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="flex font-semibold">
        <div className="w-[30px] border-y border-r border-slate-400 p-2 px-3"></div>
        <div className="w-1/5 border-y border-r border-slate-400 p-2 px-3">
          Timestamp
        </div>
        <div className="w-1/6 border-y border-r border-slate-400 p-2 px-3">
          Patient Name
        </div>
        <div className="w-1/5 border-y border-r border-slate-400 p-2 px-3">
          Patient No.
        </div>
        <div className="w-1/3 border-y border-r border-slate-400 p-2 px-3">
          Message
        </div>
        <div className="grow border-y border-slate-400 p-2 px-3"></div>
      </div>
      {messages.map((message) => {
        return (
          <div className="flex border-b border-slate-300 py-2" key={message.id}>
            <div className="w-[30px]"></div>
            <div className="w-1/5 px-3">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="w-1/6 px-3">
              <Link
                className="text-[#4a9bff] hover:text-[#006ef7]"
                to={`../patients/${message.patient.id}`}
                state={{ returnUrl: location.pathname }}
              >
                {message.patient.firstName + " " + message.patient.lastName}
              </Link>
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
