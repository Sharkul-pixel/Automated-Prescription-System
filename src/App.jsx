import { useState } from "react";

import NewPatientForm from "./NewPatientForm";

import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);

  return (
    <>
      <NewPatientForm />
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
