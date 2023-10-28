import { Link, useLoaderData } from "react-router-dom";

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

  return (
    <div>
      <div
        className="flex h-[4.5rem] items-center"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%234a9bff' fill-opacity='0.48' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <div>
          <Link
            to={page > 1 ? `/messages?page=${page - 1}` : "/messages?page=1"}
          >
            Previous
          </Link>
          <div className="flex">
            <span className="border">{page}</span>
            <span>of</span>
            <span>{numPages}</span>
          </div>
          <Link
            to={
              page == numPages
                ? `/messages?page=${numPages}`
                : `/messages?page=${page + 1}`
            }
          >
            Next
          </Link>
        </div>
      </div>
      {/* <div className="mb-[56px]">whitespace</div> */}
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
            <div className="w-1/4 px-3">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
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
