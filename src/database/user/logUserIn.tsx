import * as admin from "firebase-admin";

<<<<<<< Updated upstream
export const logUserIn = async (email: string, password: string) => {
=======
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
>>>>>>> Stashed changes
  try {
    const ref = admin.database().ref("AgroSync/Users");

    const snapshot = await ref.once("value");

<<<<<<< Updated upstream
    console.log("chamou logUserIn = ", logUserIn);

    for (let userId in users) {
      let user = users[userId];
      if (user.Email === email) {
        const passwordIsCorrect = user.Password === password ? true : false;
        return { user, passwordIsCorrect };
=======
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
>>>>>>> Stashed changes
      }
    }

    return null;
  } catch (error: any) {
<<<<<<< Updated upstream
    console.error("Error loggin user:", error.message);
    throw error;
=======
    console.error("Error logging user:", error.message);
    throw error; // Re-throwing for now, handle it according to your application's needs
>>>>>>> Stashed changes
  }
};
