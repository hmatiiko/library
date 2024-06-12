import Joi from "joi";

export const userFormSchema = Joi.object({
  email: Joi.string().max(64).email().required(),
  password: Joi.string().min(8).required(),
});
