import {
  findSession,
  deleteTheSession,
} from "../repositories/authRepository.js";

async function deleteSession(req, res) {
  const token = res.locals.token.toString();
  try {
    const session = await findSession(token);
    if (!session) {
      return res.sendStatus(404);
    }
    await deleteTheSession(token);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export { deleteSession };
