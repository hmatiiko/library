// import jwt from 'jsonwebtoken';
// import { findUserByEmailQuery } from '../models/User';

// export const auth = async (req, res, next) => {
//   try {
//     const header = req.headers.authorization || '';
//     const token = header.split(' ')[1];
//     const decoded = <IDecode>jwt.verify(token, process.env.JWT_SECRET!);

//     if (!decoded.userEmail) {
//       return res.status(401).send({
//         errorMessage: 'Wrong user',
//       });
//     }

//     const findUserQuery = await findUserByEmailQuery(decoded.userEmail);
//     const isUserExist: boolean = !!findUserQuery.rowCount;

//     if (!isUserExist) {
//       return res.status(401).send({
//         errorMessage: 'Wrong user',
//       });
//     }

//     (req as RequestWithUser).user = findUserQuery.rows[0];
//     next();
//   } catch (e) {
//     res.status(401).send({ error: 'Please authenticate.' });
//   }
// };

import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      return res.status(401).send({
        errorMessage: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
