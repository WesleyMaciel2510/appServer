import express from "express";
import { searchScheduling } from "../database/schedulings/index";

const schedulingRouter = express.Router();
// GET-SEARCH SCHEDULING ============================================

schedulingRouter.get("/:SCHEDULINGNUMBER", async (req, res) => {
  console.log("GET schedulingRouter CALLED");
  const schedulingNumberString = req.params.SCHEDULINGNUMBER;

  const schedulingNumber = parseInt(schedulingNumberString, 10);
  console.log("schedulingNumber = ", schedulingNumber);

  if (schedulingNumber) {
    console.log("entrou no schedulingNumber IF vai chamar");
    try {
      console.log("schedulingNumber = ", schedulingNumber);
      const foundScheduling = await searchScheduling(schedulingNumber);
      console.log("foundScheduling = ", foundScheduling);

      if (foundScheduling !== null) {
        res.status(200).json(foundScheduling);
      } else {
        res.status(404).send("Scheduling not found");
      }
    } catch (error: any) {
      console.error("Error searching scheduling:", error.message);
      res.status(500).send("Error searching scheduling");
    }
  } else {
    res.status(400).send("Invalid scheduling number");
  }
});

export default schedulingRouter;
