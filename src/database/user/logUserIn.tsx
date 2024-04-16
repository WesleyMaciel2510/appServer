import * as admin from "firebase-admin";
import bcrypt from "bcrypt";

export const logUserIn = async (
  email: string,
  password: string
): Promise<{ user: any; passwordIsCorrect?: boolean } | null> => {
  try {
    const ref = admin.database().ref("AgroSync/Users");
    const snapshot = await ref.once("value");
    const users = snapshot.val();

    for (let userId in users) {
      let user = users[userId];
      if (user.Email === email) {
        const passwordIsCorrect = await bcrypt.compare(password, user.Password);
        console.log("password = ", password);
        console.log("user.Password = ", user.Password);
        console.log("passwordIsCorrect = ", passwordIsCorrect);

        return { user, passwordIsCorrect };
      }
    }

    return null;
  } catch (error: any) {
    console.error("Error logging user:", error.message);
    throw error;
  }
};
