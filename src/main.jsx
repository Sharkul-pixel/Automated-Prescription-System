import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/Root";
import Patient, { loader as patientLoader } from "./routes/Patient.jsx";
import PatientList, {
  loader as patientListLoader,
} from "./routes/PatientList.jsx";
import NewPatientForm from "./routes/NewPatientForm";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<PatientList />} loader={patientListLoader}></Route>
      <Route
        path="/patients/:patientId"
        element={<Patient />}
        loader={patientLoader}
      ></Route>
      <Route path="/patients/new" element={<NewPatientForm />}></Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
