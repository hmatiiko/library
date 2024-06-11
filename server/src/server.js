import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Signup } from "./api/signup.js";
import { Login } from "./api/login.js";
//todo move to 1 conytroller books and users wuth several methods
import { CreateBook } from "./api/books/createBook.js";
import { GetBooks } from "./api/books/getBooks.js";
import { DeleteBook } from "./api/books/deleteBook.js";
import { auth } from "./middleware/auth.js";

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

///todo move to users controller

//todo rename signup to register
app.post("/register", Signup);
app.post("/login", Login);

app.get("/books", auth, GetBooks);
app.post("/books", auth, CreateBook);
app.delete("/books/:id", auth, DeleteBook);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
