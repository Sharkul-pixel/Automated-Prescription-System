import "dotenv/config";
import express from "express";

import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
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

router.post("/", async (req, res) => {
  const patient = await prisma.patient.create({
    data: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    },
  });

  return res.json(patient);
});

router.get("/:patientId", async (req, res) => {
  const patientId = req.params.patientId;

  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });

  return res.json(patient);
});

router.patch("/:patientId", async (req, res) => {
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

router.get("/:patientId/messages", async (req, res) => {
  const patientId = req.params.patientId;

  const patientMessages = await prisma.message.findMany({
    where: {
      patientId: patientId,
    },
  });

  return res.json(patientMessages);
});

export default router;
