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
    .catch((error) => {
      console.log("DB connect wrong");
      throw error;
    });
}

export async function disconnectDBForTesting() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close().catch((error) => {
    throw error;
  });
  await mongo.stop();
}

export async function clearDBForTesting() {
  const collectons = mongoose.connection.collections;
  for (const key in collectons) {
    const collection = collectons[key];
    await collection.deleteMany({}).catch((error) => {
      throw error;
    });
  }
}
