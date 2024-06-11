// import { createUserQuery, findUserByEmailQuery } from "../models/User.js";
import { signToken } from "../helpers/signToken.js";
import { userFormSchema } from "../helpers/Joi/formDataSchema.js";
import { User } from "../models/User.js";

export const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error: validationError } = userFormSchema.validate({
      email,
      password,
    });

    if (validationError) {
      return res.status(400).send({
        error: validationError.details[0].message,
      });
    }

    const user = await User.findOne({
      attributes: ["id"],
      where: {
        email: email,
      },
    });

    if (!user) {
      await User.create({ email: email, password: password });
      const token = signToken(email);

      return res.status(201).send({
        token,
      });
    } else {
      return res.status(400).send({
        errorMessage: "User already exists",
      });
    }
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal Server Error",
    });
  }
};
