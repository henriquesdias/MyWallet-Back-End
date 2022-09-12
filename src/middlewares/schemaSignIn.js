import joi from "joi";
const loginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
function schemaSignIn(req, res, next) {
  const { email, password } = req.body;
  const validation = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }
  res.locals.body = { email, password };
  next();
}
export { schemaSignIn };
