import toast from "react-hot-toast";
import {
  useNavigate,
  useLoaderData,
  Form,
  redirect,
  useLocation,
} from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/patients/${params.patientId}`,
  );
  const patient = await response.json();

  return { patient };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const entries = Object.fromEntries(formData);

  console.log(entries);

  await fetch(`http://localhost:3000/patients/${params.patientId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: entries.firstName,
      lastName: entries.lastName,
      phoneNumber: entries.phoneNumber,
    }),
  });

  toast.success("Updated patient's info!");

  return redirect(
    `/patients/${params.patientId}/?returnUrl=${entries.returnUrl}`,
  );
}

export default function EditPatientForm() {
  const { patient } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  return (
    <>
      <Form method="patch">
        <div className="mx-1 mb-4 flex h-[33px] items-center">
          <span className="grow font-semibold">Update Patient Details</span>
        </div>
        <div className="mx-1 mb-4 flex items-center">
          <div className="w-1/3">
            <label>First name</label>
          </div>
          <div className="w-2/3">
            <input
              name="firstName"
              className="w-full rounded border border-slate-400 p-2 py-1"
              type="text"
              value={patient.firstName}
            />
          </div>
        </div>
        <div className="mx-1 mb-4 flex items-center">
          <div className="w-1/3">
            <label>Last name</label>
          </div>
          <div className="w-2/3">
            <input
              name="lastName"
              className="w-full rounded border border-slate-400 p-2 py-1"
              type="text"
              value={patient.lastName}
            />
          </div>
        </div>
        <div className="mx-1 mb-2.5 flex items-center">
          <div className="w-1/3">
            <label>Phone number</label>
          </div>
          <div className="w-2/3">
            <input
              name="phoneNumber"
              className="w-full rounded border border-slate-400 p-2 py-1"
              type="tel"
              value={patient.phoneNumber}
            />
          </div>
        </div>

        <input
          type="hidden"
          name="returnUrl"
          defaultValue={location.state?.returnUrl}
        />

        <div className="mt-3 flex">
          <div className="grow"></div>
          <button
            // className="bg-blue-500 px-2 text-white"
            className="mr-1 rounded border-2 border-[#3a92ff] bg-[#4a9bff] px-4 text-white hover:bg-[#2989ff]"
            type="submit"
          >
            Save
          </button>
          <button
            // className="m-1 bg-slate-500 px-2 text-white"
            className="ml-1 rounded border-2 border-[#798da4] bg-[#8295aa] px-4 text-white hover:bg-[#70869e]"
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
