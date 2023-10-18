import { Form } from "react-router-dom";

export async function action({ request, params }) {
  console.log("NewPatientForm action called");
  console.log(request);
  console.log(params);
  return null;
}

export default function NewPatientForm() {
  return (
    <>
      <Form method="post">
        <div>
          <label>First name</label>
          <input className="border border-slate-400" type="text" />
        </div>
        <div>
          <label>Last name</label>
          <input className="border border-slate-400" type="text" />
        </div>
        <div>
          <label>Phone number</label>
          <input className="border border-slate-400" type="tel" />
        </div>
        <button type="submit">Add</button>
      </Form>
    </>
  );
}
