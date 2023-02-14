import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import {
  findUserByEmail,
  createUser,
  createSession,
} from "../repositories/authRepository.js";

async function signUp(req, res) {
  const { name, email, password } = res.locals.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(409).send({ message: "E-mail já está em uso" });
    }
    await createUser({ name, email, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
async function signIn(req, res) {
  const { email, password } = res.locals.body;
  try {
    const user = await findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await createSession({ token, userId: user._id });
      return res.status(200).send({ token, name: user.name });
    }
    res.sendStatus(401);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { signUp, signIn };
