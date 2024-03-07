import * as admin from "firebase-admin";

export const updateUser = async (index: string, newUser: object) => {
  try {
    const usersRef = admin.database().ref("AgroSync/Users");
    const snapshot = await usersRef.orderByKey().equalTo(index).once("value");

    if (snapshot.exists()) {
      const userKey = Object.keys(snapshot.val())[0];
      await usersRef.child(userKey).update(newUser);
      return `User with Index ${index} updated successfully.`;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error("Error updating user:", error.message);
  }
};
