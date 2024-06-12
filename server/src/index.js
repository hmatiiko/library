import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Register } from "./api/users/register.js";
import { Login } from "./api/users/login.js";
import { CreateBook } from "./api/books/createBook.js";
import { GetBooks } from "./api/books/getBooks.js";
import { UpdateBook } from "./api/books/updateBook.js";
import { DeleteBook } from "./api/books/deleteBook.js";
import { auth } from "./middleware/auth.js";

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

app.post("/register", Register);
app.post("/login", Login);

app.get("/books", auth, GetBooks);
app.post("/books", auth, CreateBook);
app.patch("/books/:id", auth, UpdateBook);
app.delete("/books/:id", auth, DeleteBook);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
