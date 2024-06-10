import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Signup } from "./api/signup.js";
import { Login } from "./api/login.js";

// const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize(process.env.DATABASE_URL);

// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfull ay.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

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
app.post("/login", Login);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
