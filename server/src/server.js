import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Signup } from "./api/signup.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Successful response!!!.");
});

app.post("/register", Signup);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
