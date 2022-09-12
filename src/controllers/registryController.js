import db from "../database/mongo.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

async function createRegistry(req, res) {
  const token = res.locals.token;
  const { value, description, isOutput } = res.locals.body;
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
    res.status(500).send(error.message);
  }
}
async function deleteRegistry(req, res) {
  const idRegistry = req.params.idRegistry;
  try {
    const registry = await db
      .collection("registries")
      .findOne({ _id: new ObjectId(idRegistry) });
    if (!registry) {
      return res.sendStatus(404);
    }
    await db
      .collection("registries")
      .deleteOne({ _id: new ObjectId(idRegistry) });
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
  }
}
async function updateRegistry(req, res) {
  const { value, description } = req.body;
  const { idRegistry } = req.params;
  try {
    const registry = await db
      .collection("registries")
      .findOne({ _id: new ObjectId(idRegistry) });
    if (!registry) {
      return res.sendStatus(404);
    }
    await db
      .collection("registries")
      .updateOne(
        { _id: new ObjectId(idRegistry) },
        { $set: { value, description } }
      );
    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
  }
}
export { createRegistry, getRegistries, deleteRegistry, updateRegistry };
