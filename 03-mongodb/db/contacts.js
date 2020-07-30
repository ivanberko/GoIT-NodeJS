const mongodb = require("mongodb");
const { MongoClient } = mongodb;
const MONGO_DB_URL =
  "mongodb+srv://ivan_berk_admin:11131426@cluster0.pvhcb.mongodb.net/<dbname>?retryWrites=true&w=majority";
const DB_NAME = "db-contacts";

const mainDB = async () => {
  const client = await MongoClient.connect(MONGO_DB_URL);
  const db = client.db(DB_NAME);
  const contacts_collection = db.collection("contacts");

  console.log(await contacts_collection.find({ name: "Allen Raymond" }).toArray());
};

mainDB();
