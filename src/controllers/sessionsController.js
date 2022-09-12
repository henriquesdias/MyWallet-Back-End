import db from "../database/mongo.js";
async function deleteSession(req, res) {
  const token = res.locals.token.toString();
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(404);
    }
    await db.collection("sessions").deleteOne({ token });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export { deleteSession };
