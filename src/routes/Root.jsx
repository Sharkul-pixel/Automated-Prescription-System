import { useEffect, useState } from "react";

import NewPatientForm from "./NewPatientForm";

export default function Root() {
  const [patients, setPatients] = useState(() => {
    const patients = localStorage.getItem("patients");
    return JSON.parse(patients) ?? [];
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-1/4 border-r-2">sidebar</aside>
        <div className="w-3/4">
          <NewPatientForm setPatients={setPatients} />
          <hr />
          <button
            onClick={() => {
              setPatients([]);
            }}
          >
            Clear patients
          </button>
          <hr />
          <div>
            {patients.map((patient) => {
              return (
                <div
                  className="my-1 cursor-pointer border border-slate-600 py-2 hover:bg-blue-50"
                  key={patient.id}
                >
                  <span>{patient.firstName}</span>
                  &nbsp;
                  <span>{patient.lastName}</span>
                  &nbsp;
                  <span>{patient.phoneNumber}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
