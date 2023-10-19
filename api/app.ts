import cors from "cors";
import express from "express";

import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/patients", async (req, res) => {
  const patients = await prisma.patient.findMany();
  return res.json(patients);
});

app.post("/patients", async (req, res) => {
  const patient = await prisma.patient.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    },
  });

  return res.json(patient);
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
