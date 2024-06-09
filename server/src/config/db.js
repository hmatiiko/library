import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.POSTGRES_DB_PORT),
  database: process.env.POSTGRES_DB,
});

export default {
  query: (text, params) => pool.query(text, params),
};
