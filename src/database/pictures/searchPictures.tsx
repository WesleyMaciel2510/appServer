import * as admin from "firebase-admin";

interface PictureData {
  ID: number;
  IDTYPE: "LOADID" | "SCHEDULINGID";
  BASE64: string;
  DATETIME: string;
}

export const searchPictures = async (
  IDTYPE: "LOADID" | "SCHEDULINGID",
  IDSEARCHED: number
) => {
  try {
    console.log("Chamou searchPictures in Firebase");

    let picturesRef, snapshot;
    if (IDTYPE === "SCHEDULINGID") {
      picturesRef = admin.database().ref(`AgroSync/Pictures/schedulings/`);
      snapshot = await picturesRef.once("value");
    } else {
      picturesRef = admin.database().ref(`AgroSync/Pictures/loads`);
      snapshot = await picturesRef.once("value");
    }
    const snapshotPictures = snapshot.val() || {};

    // Filter pictures based on ID
    const filteredPictures = Object.values(snapshotPictures).filter(
      (picture: any) => picture.ID === IDSEARCHED
    );

    console.log("Retrieved Pictures: ", filteredPictures.length);
    return filteredPictures;
  } catch (error) {
    console.error("Error getting pictures:", error);
    throw error;
  }
};
