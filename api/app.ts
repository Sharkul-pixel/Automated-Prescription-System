import cors from "cors";
import "dotenv/config";
import express from "express";

import messageRoutes from "./routes/messageRoutes";
import patientRoutes from "./routes/patientRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/messages", messageRoutes);
app.use("/patients", patientRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
