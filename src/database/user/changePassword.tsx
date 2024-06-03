import * as admin from "firebase-admin";

export const updatePassword = async (email: string, newPassword: string) => {
  try {
    const usersRef = admin.database().ref("AgroSync/Users");
    const snapshot = await usersRef
      .orderByChild("Email")
      .equalTo(email)
      .once("value");

    if (snapshot.exists()) {
      // Update the password in the fetched user data
      snapshot.forEach((childSnapshot) => {
        console.log(" childSnapshot = ", childSnapshot);
        const userKey = childSnapshot.key;
        console.log(" userKey = ", userKey);
        usersRef.child(userKey!).update({ Password: newPassword });
      });

      return `Password updated successfully for user with email ${email}.`;
    } else {
      return `User with email ${email} not found.`;
    }
  } catch (error: any) {
    console.error("Error updating password:", error.message);
    throw error;
  }
};
