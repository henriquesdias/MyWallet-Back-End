import joi from "joi";

export const registrySchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required().trim(),
  isOutput: joi.valid(true, false).required(),
});

export const registryUpdate = joi.object({
  value: joi.number().required(),
  description: joi.string().required().trim(),
});
