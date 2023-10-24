import cors from "cors";
import "dotenv/config";
import express from "express";

import { PrismaClient } from "@prisma/client";

import messageRoutes from "./routes/messageRoutes";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/messages", messageRoutes);

app.get("/patients", async (req, res) => {
  const q = (req.query.q as string) ?? "";

  const patients = await prisma.patient.findMany({
    where: {
      firstName: {
        contains: q,
      },
    },
  });

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

app.patch("/patients/:patientId", async (req, res) => {
  const patientId = req.params.patientId;

  await prisma.patient.update({
    where: {
      id: patientId,
    },
    data: {
      ...req.body,
    },
  });

  return res.status(200).send();
});

app.get("/patients/:patientId/messages", async (req, res) => {
  const patientId = req.params.patientId;

  const patientMessages = await prisma.message.findMany({
    where: {
      patientId: patientId,
    },
  });

  return res.json(patientMessages);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
