import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
