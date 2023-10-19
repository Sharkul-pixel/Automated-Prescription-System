import cors from "cors";
import express from "express";

import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cors());

app.get("/patients", async (req, res) => {
  const patients = await prisma.patient.findMany();
  return res.json(patients);
});

app.get("/patients/:patientId", async (req, res) => {
  const patientId = req.params.patientId;

  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });

  return res.json(patient);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
