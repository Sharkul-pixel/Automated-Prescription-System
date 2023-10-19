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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
