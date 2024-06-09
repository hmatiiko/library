import jwt from "jsonwebtoken";

export function signToken(email) {
  return jwt.sign(
    {
      userEmail: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}
