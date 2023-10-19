import cors from "cors";
import express from "express";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
