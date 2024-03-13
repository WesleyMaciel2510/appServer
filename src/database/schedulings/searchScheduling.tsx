import * as admin from "firebase-admin";

export const searchScheduling = async (schedulingNumber: number) => {
  console.log("chamou searchScheduling");
  try {
    const schedulingRef = admin.database().ref("AgroSync/Scheduling");
    const snapshot = await schedulingRef.once("value");
    console.log("schedulingRef = ", schedulingRef);
    console.log("snapshot = ", snapshot);

    const foundScheduling: any[] = [];

    if (snapshot.exists() && snapshot.hasChildren()) {
      snapshot.forEach((childSnapshot) => {
        const schedulingObject = childSnapshot.val();
        console.log("schedulingObject = ", schedulingObject);
        console.log(
          "schedulingObject.IDAgendamento = ",
          schedulingObject.IDAgendamento
        );
        console.log("schedulingNumber = ", schedulingNumber);

        if (schedulingObject.IDAgendamento === schedulingNumber) {
          foundScheduling.push(schedulingObject);
        }
      });

      return foundScheduling;
    } else {
      console.log("No scheduling found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting scheduling:", error);
    throw error;
  }
};
