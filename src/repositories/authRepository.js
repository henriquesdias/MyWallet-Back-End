import db from "../database/mongo.js";

async function findUserByEmail(email) {
  return db.collection("users").findOne({ email: email });
}
async function createUser({ name, email, password }) {
  return db.collection("users").insertOne({ name, email, password });
}
async function findUserById(userId) {
  return db.collection("users").findOne({ _id: userId });
}
async function createSession({ userId, token }) {
  return db.collection("sessions").insertOne({
    userId,
    token,
  });
}
async function findSession(token) {
  return db.collection("sessions").findOne({ token });
}
async function deleteTheSession(token) {
  return db.collection("sessions").deleteOne({ token });
}

export {
  findUserByEmail,
  createUser,
  createSession,
  findSession,
  deleteTheSession,
  findUserById,
};
