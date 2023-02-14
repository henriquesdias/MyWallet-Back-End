import dayjs from "dayjs";

import { findSession, findUserById } from "../repositories/authRepository.js";
import {
  createNewRegistry,
  getAllRegistries,
  getRegistryById,
  deleteTheRegistry,
  updateTheRegistry,
} from "../repositories/registryRepository.js";

async function createRegistry(req, res) {
  const token = res.locals.token;
  const { value, description, isOutput } = res.locals.body;
  try {
    const session = await findSession(token);
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await findUserById(session.userId);
    const registry = await createNewRegistry({
      user: user._id,
      value,
      description,
      isOutput,
    });
    res.status(201).send({
      id: registry.insertedId,
      value,
      description,
      isOutput,
      date: dayjs().format("DD/MM"),
    });
  } catch (error) {
    res.sendStatus(500);
  }
}
async function getRegistries(req, res) {
  const token = res.locals.token;
  try {
    const session = await findSession(token);
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await findUserById(session.userId);
    const registries = await getAllRegistries(user._id);
    res.send(registries);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function deleteRegistry(req, res) {
  const idRegistry = req.params.idRegistry;
  try {
    const registry = await getRegistryById(idRegistry);
    if (!registry) {
      return res.sendStatus(404);
    }
    await deleteTheRegistry(idRegistry);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}
async function updateRegistry(req, res) {
  const { value, description } = res.locals.body;
  const { idRegistry } = req.params;
  try {
    const registry = await getRegistryById(idRegistry);
    if (!registry) {
      return res.sendStatus(404);
    }
    await updateTheRegistry({ idRegistry, value, description });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
export { createRegistry, getRegistries, deleteRegistry, updateRegistry };
