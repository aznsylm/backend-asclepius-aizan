const { Firestore } = require("@google-cloud/firestore");
require("dotenv").config();

const db = new Firestore({ projectId: process.env.PROJECT_ID });

async function storeData(id, data) {
  const predictCollection = db.collection("predictions");

  return predictCollection.doc(id).set(data);
}

async function getAllData() {
  const predictCollection = db.collection("predictions");

  const snapshot = await predictCollection.get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({ id: doc.id, history: doc.data() }));
}

module.exports = { storeData, getAllData };
