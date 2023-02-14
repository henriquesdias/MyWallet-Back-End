import dayjs from "dayjs";
import { ObjectId } from "mongodb";

import db from "../database/mongo.js";

async function createNewRegistry({ user, value, description, isOutput }) {
  return db.collection("registries").insertOne({
    user,
    value,
    description,
    isOutput,
    date: dayjs().format("DD/MM"),
  });
}
async function getAllRegistries(userId) {
  return await db.collection("registries").find({ user: userId }).toArray();
}
async function getRegistryById(idRegistry) {
  return db.collection("registries").findOne({ _id: new ObjectId(idRegistry) });
}
async function deleteTheRegistry(idRegistry) {
  return db
    .collection("registries")
    .deleteOne({ _id: new ObjectId(idRegistry) });
}
async function updateTheRegistry({ idRegistry, value, description }) {
  return db
    .collection("registries")
    .updateOne(
      { _id: new ObjectId(idRegistry) },
      { $set: { value, description } }
    );
}

export {
  createNewRegistry,
  getAllRegistries,
  getRegistryById,
  deleteTheRegistry,
  updateTheRegistry,
};
