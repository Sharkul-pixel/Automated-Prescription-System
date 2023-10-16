import { useEffect, useState } from "react";

import NewPatientForm from "./NewPatientForm";

import "./App.css";

function App() {
  const [patients, setPatients] = useState(() => {
    const patients = localStorage.getItem("patients");
    return JSON.parse(patients) ?? [];
  });

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  return (
    <>
      <NewPatientForm setPatients={setPatients} />
      <hr />
      <div>
        {patients.map((patient) => {
          return (
            <div key={patient.id}>
              <span>{patient.firstName}</span>
              &nbsp;
              <span>{patient.lastName}</span>
              &nbsp;
              <span>{patient.phoneNumber}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
