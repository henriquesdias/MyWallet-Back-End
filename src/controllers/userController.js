import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import joi from "joi";
import db from "../database/mongo.js";
const userSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
const loginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
async function signUp(req, res) {
  const { name, email, password } = req.body;
  const validation = userSchema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const users = await db.collection("users").findOne({ email });
    if (users) {
      return res.sendStatus(409);
    }
    await db
      .collection("users")
      .insertOne({ name, email, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function signIn(req, res) {
  const { email, password } = req.body;
  const validation = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const errors = validation.error.details.map((e) => e.message);
    return res.status(422).send(errors);
  }
  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      return res.status(200).send({ token, name: user.name });
    }
    res.sendStatus(401);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export { signUp, signIn };
