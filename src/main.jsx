import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Patients from "./routes/Patients";
import Patient, { loader as patientLoader } from "./routes/Patient";
import PatientList, { loader as patientListLoader } from "./routes/PatientList";
import NewPatientForm, {
  action as newPatientFormAction,
} from "./routes/NewPatientForm";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/patients" element={<Patients />}>
      <Route index element={<PatientList />} loader={patientListLoader}></Route>
      <Route
        path="/patients/:patientId"
        element={<Patient />}
        loader={patientLoader}
      ></Route>
      <Route
        path="/patients/new"
        element={<NewPatientForm />}
        action={newPatientFormAction}
      ></Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
