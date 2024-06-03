import * as admin from "firebase-admin";

import ServiceAccount from "../.env/serviceAccount";

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount),
  databaseURL: "https://appserver-2510-default-rtdb.firebaseio.com/",
  projectId: "appserver-2510",
  storageBucket: "gs://appserver-2510.appspot.com",
});

const database = admin.database();
const auth = admin.auth();

// Test call to verify Firebase Admin SDK is working
export const testFirebase = async () => {
  try {
    const firestore = admin.firestore();
    const productsCollection = firestore.collection("products");
    const querySnapshot = await productsCollection.get();
    //console.log("firestore = ", firestore);
    //console.log("productsCollection = ", productsCollection);
    //console.log("querySnapshot = ", querySnapshot);

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });

    console.log("Firebase Admin SDK initialization successful!");
  } catch (error: any) {
    console.error("Error with Firebase Admin SDK:", error.message);
  }
};
