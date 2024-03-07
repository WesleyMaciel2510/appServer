import * as admin from "firebase-admin";

export const searchLoad = async (loadNumber: number) => {
  console.log("chamou searchLoad");
  try {
    const loadsRef = admin.database().ref("AgroSync/Loads");
    const snapshot = await loadsRef.once("value");

    const foundLoads: any[] = [];

    if (snapshot.exists() && snapshot.hasChildren()) {
      snapshot.forEach((childSnapshot) => {
        const loadObject = childSnapshot.val();
        if (loadObject.ID === loadNumber) {
          foundLoads.push(loadObject);
        }
      });

      return foundLoads;
    } else {
      console.log("No loads found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting load:", error);
    throw error;
  }
};
