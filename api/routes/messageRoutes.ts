import "dotenv/config";
import express from "express";

import { PrismaClient } from "@prisma/client";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const messages = await prisma.message.findMany();
  return res.json(messages);
});

router.post("/", async (req, res) => {
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

export default router;
