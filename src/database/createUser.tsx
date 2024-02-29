import * as admin from "firebase-admin";

export const createUser = async (userData: any) => {
  try {
    const usersRef = admin.database().ref("AgroSync/Users");
    //put and set method was creating a random string index "-Nrpk9s-lxzszU5W5zWw"
    //the result expected is index.lenght + 1, this is the solution:
    const snapshot = await usersRef.once("value");
    const currentUsers = snapshot.val() || {};

    // Calculate the new index
    const newIndex = currentUsers ? Object.keys(currentUsers).length : 0;

    // Set the new user data at the generated key
    await usersRef.child(newIndex.toString()).set(userData);

    console.log("New user added successfully.");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
