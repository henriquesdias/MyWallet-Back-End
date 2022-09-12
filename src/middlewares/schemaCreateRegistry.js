import joi from "joi";
const registrySchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required().trim(),
  isOutput: joi.valid(true, false).required(),
});
function schemaCreateRegistry(req, res, next) {
  const { value, description, isOutput } = req.body;
  const validation = registrySchema.validate(
    {
      value,
      description,
      isOutput,
    },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }
  res.locals.body = { value, description, isOutput };
  next();
}
export { schemaCreateRegistry };
