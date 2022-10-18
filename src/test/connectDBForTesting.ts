import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;
export async function connectDBForTesting() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  const dbName = "test";
  await mongoose
    .connect(uri, {
      dbName,
      autoCreate: true,
    })
    .then(() => {
      const db = mongoose.connection;
      db.on("error", (err) => console.error);
      console.log("DB connect successfully");
    })
    .catch((error) => {
      console.log("DB connect wrong");
      throw error;
    });
}

export async function disconnectDBForTesting() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection
    .close()
    .then(() => {
      console.log("DB disconnect successfully");
    })
    .catch((error) => {
      throw error;
    });
  await mongo.stop();
}

export async function clearDBForTesting() {
  const collectons = mongoose.connection.collections;
  for (const key in collectons) {
    const collection = collectons[key];
    await collection
      .deleteMany({})
      .then(() => {
        console.log("DB clear successfully");
      })
      .catch((error) => {
        throw error;
      });
  }
}
