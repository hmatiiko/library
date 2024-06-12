import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { saltPassword } from "../helpers/users/saltPassword.js";
import { createHmac } from "crypto";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      set(value) {
        this.setDataValue("password", saltAndHashPassword(value));
      },
    },
  },
  {
    tableName: "users",
    updatedAt: false,
  }
);

export const saltAndHashPassword = (password) => {
  const saltedPassword = saltPassword(password);
  const hash = createHmac("sha256", saltedPassword).digest("hex");
  return hash;
};
