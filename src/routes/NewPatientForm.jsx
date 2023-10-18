export default function NewPatientForm() {
  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">First name</label>
          <input
            className="border border-slate-400"
            ref={firstNameRef}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input
            className="border border-slate-400"
            ref={lastNameRef}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="">Phone number</label>
          <input
            className="border border-slate-400"
            ref={phoneNumberRef}
            type="tel"
          />
        </div>
        <input className="border" type="submit" value={"Add"} />
      </form>
    </>
  );
}
