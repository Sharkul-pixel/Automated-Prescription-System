export default function NewPatientForm() {
  return (
    <>
      <form>
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
      </form>
    </>
  );
}
