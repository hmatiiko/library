import Joi from "joi";

///todo rename folder to validators and move to /src
// and separate by mpdules users, books

export const userFormSchema = Joi.object({
  email: Joi.string().max(64).email().required(),
  password: Joi.string().min(8).required(),
});

//todo rename to bookSchema?
export const createBookSchema = Joi.object({
  title: Joi.string().max(64).required(),
  author: Joi.string().max(64).required(),
  description: Joi.string().required(),
  //todo get from model?
  status: Joi.number().valid(0, 1).required(),
});
