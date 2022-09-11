import db from "../database/mongo.js";
async function deleteSession(req, res) {
  const token = res.locals.token;
  try {
    const session = await db.collection("sessions").findOne({ token });
    console.log(session);
    res.status(200).send(session);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export { deleteSession };
