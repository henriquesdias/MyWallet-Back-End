import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
dotenv.config();
const server = express();
server.use(express.json());
server.use(cors());
console.log(dayjs().format("DD/MM"));
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("MyWallet-API");
});

const userSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
const loginSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().required().trim(),
});
const transitionSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required().trim(),
  isOutput: joi.valid(true, false).required(),
});
server.post("/sign-up", async (req, res) => {
  const { user, email, password } = req.body;
  const validation = userSchema.validate(
    { name: user, email, password },
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
      .insertOne({ name: user, email: email, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
server.post("/sign-in", async (req, res) => {
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
      return res.status(200).send(token);
    }
    res.sendStatus(401);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
server.post("/transitions", async (req, res) => {
  const { authorization } = req.headers;
  const { value, description, isOutput } = req.body;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const validation = transitionSchema.validate(
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
    const transition = await db
      .collection("transitions")
      .insertOne({
        user: user._id,
        value,
        description,
        isOutput,
        date: dayjs().format("DD/MM"),
      });
    res
      .status(201)
      .send({
        id: transition.insertedId,
        value,
        description,
        isOutput,
        date: dayjs().format("DD/MM"),
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
server.get("/transitions", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({ _id: session.userId });
    const transitions = await db
      .collection("transitions")
      .find({ user: user._id })
      .toArray();
    console.log(user._id);
    res.send(transitions);
  } catch (error) {
    res.status(500).send(error, message);
  }
});
server.listen(5000, () => console.log("Listening on port 5000"));
