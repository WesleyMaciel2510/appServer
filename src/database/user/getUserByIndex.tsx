import * as admin from "firebase-admin";

export const getUserByIndex = async (userIndex: string) => {
  try {
    const usersRef = admin.database().ref("AgroSync/Users");
    const snapshot = usersRef.orderByKey().equalTo(userIndex).once("value");

    const user = snapshot;
    return user;
  } catch (error: any) {
    console.error(`Error getting user with Index ${userIndex}:`, error.message);
    throw error;
  }
};
