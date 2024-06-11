import { userFormSchema } from "../helpers/Joi/formDataSchema.js";
import { signToken } from "../helpers/signToken.js";
import { User, saltAndHashPassword } from "../models/User.js";

export const Login = async (req, res) => {
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
      attributes: ["email", "createdAt"],
      where: {
        email: email,
        password: saltAndHashPassword(password),
      },
    });

    if (!user) {
      return res.status(400).send({
        errorMessage: "Invalid email or password",
      });
    }

    const token = signToken(user.email);

    res.status(200).send({
      data: user.dataValues,
      token,
    });
  } catch (error) {
    res.status(500).send({
      errorMessage: "Internal Server Error",
    });
  }
};
