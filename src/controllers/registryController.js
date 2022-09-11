import db from "../database/mongo.js";
import dayjs from "dayjs";
import joi from "joi";
const registrySchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required().trim(),
  isOutput: joi.valid(true, false).required(),
});

async function createRegistry(req, res) {
  const { value, description, isOutput } = req.body;
  const token = res.locals.token;
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
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    const registry = await db.collection("registries").insertOne({
      user: user._id,
      value,
      description,
      isOutput,
      date: dayjs().format("DD/MM"),
    });
    res.status(201).send({
      id: registry.insertedId,
      value,
      description,
      isOutput,
      date: dayjs().format("DD/MM"),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function getRegistries(req, res) {
  const token = res.locals.token;
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    const registries = await db
      .collection("registries")
      .find({ user: user._id })
      .toArray();
    res.send(registries);
  } catch (error) {
    res.status(500).send(error, message);
  }
}
export { createRegistry, getRegistries };
