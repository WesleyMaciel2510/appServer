import * as admin from "firebase-admin";
import bcrypt from "bcrypt";

interface User {
  Email: string;
  FullName: string;
  ID: number;
  Password: string;
  PhoneNumber: string;
  UserType: string;
}

export const logUserIn = async (
  email: string,
  password: string
): Promise<{ user: User; passwordIsCorrect?: boolean } | null> => {
  try {
    const ref = admin.database().ref("AgroSync/Users");
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return null; // No users found
    }

    const users: { [key: string]: User } = snapshot.val();

    for (const [userId, user] of Object.entries(users)) {
      if (user.Email === email) {
        const passwordIsCorrect = await bcrypt.compare(password, user.Password);
        console.log("Authentication attempt for user:", email);
        console.log("Is password correct:", passwordIsCorrect);
        return { user: user as User, passwordIsCorrect };
      }
    }

    return null;
  } catch (error: any) {
    console.error("Error logging user:", error.message);
    throw error; // Re-throwing for now, handle it according to your application's needs
  }
};
