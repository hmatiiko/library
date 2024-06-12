import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().max(64).required(),
  author: Joi.string().max(64).required(),
  description: Joi.string().required(),
  status: Joi.number().valid(0, 1).required(),
});
