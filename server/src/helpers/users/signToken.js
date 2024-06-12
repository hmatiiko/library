import jwt from "jsonwebtoken";

export function signToken(email) {
  return jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}
