// Import admin from Firebase
import * as admin from "firebase-admin";

export const getUsers = async () => {
  try {
    const ref = admin.database().ref("AgroSync/Users");

    const snapshot = await ref.once("value");
    const users = snapshot.val();

    return users;
  } catch (error: any) {
    console.error("Error getting users:", error.message);
    throw error;
  }
};
