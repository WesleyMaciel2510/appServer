import * as admin from "firebase-admin";

const serviceAccount = require("../keys/appserver-2510-firebase-adminsdk-ql8my-2886040fa5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appserver-2510-default-rtdb.firebaseio.com",
});

const database = admin.database();
const auth = admin.auth();

// Test call to verify Firebase Admin SDK is working
export const testFirebase = async () => {
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
