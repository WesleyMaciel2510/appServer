import * as admin from "firebase-admin";

interface PictureData {
  ID: number;
  IDTYPE: "LOADID" | "SCHEDULINGID";
  BASE64: string;
}

export const sendPictures = async (pictureData: PictureData) => {
  console.log("chamou sendPictures");
  console.log("PictureData = ", pictureData);
  console.log("PictureData.IDTYPE = ", pictureData.IDTYPE);
  try {
    let picturesRef, snapshot;
    if (pictureData.IDTYPE === "SCHEDULINGID") {
      picturesRef = admin.database().ref("AgroSync/Pictures/schedulings");
      snapshot = await picturesRef.once("value");
    } else {
      picturesRef = admin.database().ref("AgroSync/Pictures/loads");
      snapshot = await picturesRef.once("value");
    }
    const snapshotPictures = snapshot.val() || {};

    // Calculate the new index,  .length - 1 because arrays starts with 0
    const newIndex = snapshotPictures
      ? Object.keys(snapshotPictures).length
      : 0;
    console.log("newIndex.toString() = ", newIndex.toString());
    // Set the new user data at the generated key
    await picturesRef.child(newIndex.toString()).set(pictureData);
  } catch (error) {
    console.error("Error getting scheduling:", error);
    throw error;
  }
};
