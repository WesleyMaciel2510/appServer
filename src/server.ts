import { log } from "console";
import express from "express";
import { createServer } from "http";
import * as admin from "firebase-admin";

const serviceAccount = require("../keys/appserver-2510-firebase-adminsdk-ql8my-2886040fa5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appserver-2510-default-rtdb.firebaseio.com",
});

const database = admin.database();
const auth = admin.auth();

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const server = createServer(() => {
  console.log("Hello World!");
});

//=========================================================================
// Test call to verify Firebase Admin SDK is working
const testFirebase = async () => {
  try {
    const firestore = admin.firestore();
    const productsCollection = firestore.collection("products");
    const querySnapshot = await productsCollection.get();

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });

    console.log("Firebase Admin SDK initialization successful!");
  } catch (error: any) {
    console.error("Error with Firebase Admin SDK:", error.message);
  }
};

testFirebase();
