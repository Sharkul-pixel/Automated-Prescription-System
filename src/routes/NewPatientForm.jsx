import toast from "react-hot-toast";
import { redirect, Form, useNavigate } from "react-router-dom";

export async function action({ request, params }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  await fetch("http://localhost:3000/patients", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entries),
  });

  toast.success("Added new patient!");

  return redirect(`/patients`);
}

export default function NewPatientForm() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="flex h-[4.5rem] items-center border-b border-slate-300"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%230088ff' fill-opacity='0.65' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      ></div>
      <Form className="ml-1 w-1/2 p-2" method="post">
        <h1 className="mb-4 text-2xl">Add a New Patient</h1>
        <div className="mb-4 flex items-center">
          <div className="w-1/3">
            <label className="text-lg">First name</label>
          </div>
          <div className="w-2/3">
            <input
              name="firstName"
              className="w-full rounded border border-slate-400 p-2 py-1"
              type="text"
              autoFocus
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <div className="w-1/3">
            <label className="text-lg">Last name</label>
          </div>
          <div className="w-2/3">
            <input
              name="lastName"
              className="w-full rounded border border-slate-400 p-2 py-1"
              type="text"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <div className="w-1/3">
            <label className="text-lg">Phone number</label>
          </div>
          <div className="w-2/3">
            <input
              name="phoneNumber"
              className="w-full rounded border border-slate-400 p-2 py-1"
              type="tel"
            />
          </div>
        </div>
        <div className="mt-8 flex">
          <div className="grow"></div>
          <button
            className="mr-1 rounded border-2 border-[#3a92ff] bg-[#4a9bff] px-6 py-1.5 text-white hover:bg-[#2989ff]"
            type="submit"
          >
            Submit
          </button>
          <button
            className="ml-1 rounded border-2 border-[#798da4] bg-[#8295aa] px-6 py-1.5 text-white hover:bg-[#70869e]"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </Form>
    </>
  );
}
