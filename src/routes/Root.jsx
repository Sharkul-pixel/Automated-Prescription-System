import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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
          <Outlet />
        </div>
      </div>
    </>
  );
}
