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
      <Form method="patch" className="w-1/2 border">
        <div className="flex w-full border">
          <label className="w-1/3">First name</label>
          <input
            className="w-2/3 border"
            type="text"
            name="firstName"
            defaultValue={patient.firstName}
          />
        </div>

        <div className="flex w-full border">
          <label className="w-1/3">Last name</label>
          <input
            className="w-2/3 border"
            type="text"
            name="lastName"
            defaultValue={patient.lastName}
          />
        </div>

        <div className="flex w-full border">
          <label className="w-1/3">Phone number</label>
          <input
            className="w-2/3 border"
            type="tel"
            name="phoneNumber"
            defaultValue={patient.phoneNumber}
          />
        </div>

        <input
          type="hidden"
          name="returnUrl"
          defaultValue={location.state?.returnUrl}
        />

        <button className="m-1 bg-blue-500 px-2 text-white" type="submit">
          Save
        </button>
        <button
          className="m-1 bg-slate-500 px-2 text-white"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </Form>
    </>
  );
}
