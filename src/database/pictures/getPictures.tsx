import * as admin from "firebase-admin";

interface PictureData {
  ID: number;
  IDTYPE: "LOADID" | "SCHEDULINGID";
  BASE64: string;
  DATETIME: string;
}

export const getPictures = async (
  IDTYPE: "LOADID" | "SCHEDULINGID",
  INDEX: number
) => {
  try {
    let picturesRef, snapshot;
    if (IDTYPE === "SCHEDULINGID") {
      picturesRef = admin
        .database()
        .ref(`AgroSync/Pictures/schedulings/${INDEX}`);
      snapshot = await picturesRef.once("value");
    } else {
      picturesRef = admin.database().ref(`AgroSync/Pictures/loads/${INDEX}`);
      snapshot = await picturesRef.once("value");
    }
    const snapshotPictures = snapshot.val() || {};

    console.log("Retrieved Pictures: ", snapshotPictures);
    return snapshotPictures;
  } catch (error) {
    console.error("Error getting pictures:", error);
    throw error;
  }
};
