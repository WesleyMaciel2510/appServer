import * as admin from "firebase-admin";

export const logUserIn = async (username: string, password: string) => {
  try {
    const ref = admin.database().ref("AgroSync/Users");

    const snapshot = await ref.once("value");
    const users = snapshot.val();

    console.log("chamou logUserIn = ", logUserIn);

    for (let userId in users) {
      let user = users[userId];
      if (user.Username === username) {
        const passwordIsCorrect = user.Password === password ? true : false;
        return { user, passwordIsCorrect };
      }
    }

    return null;
  } catch (error: any) {
    console.error("Error loggin user:", error.message);
    throw error;
  }
};
