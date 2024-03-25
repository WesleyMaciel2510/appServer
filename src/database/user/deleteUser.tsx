import * as admin from "firebase-admin";

export const deleteUser = async (index: string) => {
  try {
    const usersRef = admin.database().ref("AgroSync/Users");
    const snapshot = await usersRef.orderByKey().equalTo(index).once("value");

    if (snapshot.exists()) {
      const userKey = Object.keys(snapshot.val())[0];
      await usersRef.child(userKey).remove();
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};
