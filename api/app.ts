import cors from "cors";
import "dotenv/config";
import express from "express";

import { PrismaClient } from "@prisma/client";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

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

app.post("/messages", async (req, res) => {
  console.log(req);

  // const message = client.messages
  //   .create({
  //     from: process.env.FROM_NUMBER,
  //     to: process.env.TO_NUMBER,
  //     body: req.body.body,
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  await prisma.message.create({
    data: {
      body: req.body.body,
      patient: {
        connect: {
          id: req.body.patientId,
        },
      },
    },
  });

  // console.log(message);

  res.json({ status: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
