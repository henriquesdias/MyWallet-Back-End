import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/mongo.js";

async function signUp(req, res) {
  const { name, email, password } = res.locals.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const users = await db.collection("users").findOne({ email });
    if (users) {
      return res.status(409).send("E-mail já está em uso");
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
  const { email, password } = res.locals.body;
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
