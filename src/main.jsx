import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Patients, { loader as patientsLoader } from "./routes/Patients";
import Patient, {
  loader as patientLoader,
  action as patientAction,
} from "./routes/Patient";
import NewPatientForm, {
  action as newPatientFormAction,
} from "./routes/NewPatientForm";
import HeaderAndSidebar from "./routes/HeaderAndSidebar";
import Messages, { loader as MessageLoader } from "./routes/Messages";
import EditPatientForm from "./routes/EditPatientForm";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HeaderAndSidebar />}>
      <Route
        path="/patients"
        element={<Patients />}
        loader={patientsLoader}
      ></Route>
      <Route
        path="/patients/:patientId"
        element={<Patient />}
        loader={patientLoader}
        action={patientAction}
      ></Route>
      <Route
        path="/patients/:patientId/edit"
        element={<EditPatientForm />}
      ></Route>
      <Route
        path="/patients/new"
        element={<NewPatientForm />}
        action={newPatientFormAction}
      ></Route>
      <Route
        path="/messages"
        element={<Messages />}
        loader={MessageLoader}
      ></Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
