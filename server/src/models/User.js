import { createHmac } from "crypto";
import db from "../config/db.js";
import { saltPassword } from "../helpers/saltPassword.js";
import format from "pg-format";

// export const findUserByEmailAndPasswordQuery = async (
//   email: string,
//   password: string,
// ) => {
//   password = saltAndHashPassword(password);

//   return await db.query(
//     'SELECT email, role, "createdAt" FROM users WHERE email = $1 AND password = $2 LIMIT 1;',
//     [email, password],
//   );
// };

export const findUserByEmailQuery = async (email) => {
  return await db.query(
    "SELECT id, email FROM users WHERE email = $1 LIMIT 1;",
    [email]
  );
};

// export const findUserIdsByEmailsQuery = async (emails: Array<string>) => {
//   return await db.query(
//     format("SELECT id FROM users WHERE email IN (%L)", emails),
//     []
//   );
// };

export const createUserQuery = async (email, password) => {
  password = saltAndHashPassword(password);
  await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    password,
  ]);
};

const saltAndHashPassword = (password) => {
  const saltedPassword = saltPassword(password);
  const hash = createHmac("sha256", saltedPassword).digest("hex");

  return hash;
};
