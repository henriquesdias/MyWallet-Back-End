import joi from "joi";
const userSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
function schemaSignUp(req, res, next) {
  const { name, email, password } = req.body;
  const validation = userSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }
  res.locals.body = { name, email, password };
  next();
}
export { schemaSignUp };
