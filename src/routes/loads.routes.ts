import express from "express";
import { searchLoad } from "../database/loads/index";

const loadRouter = express.Router();
// GET-SEARCH LOAD ============================================

loadRouter.get("/:LOADNUMBER", async (req, res) => {
  console.log("GET loadRouter CALLED");
  const loadNumberString = req.params.LOADNUMBER;

  const loadNumber = parseInt(loadNumberString, 10);
  console.log("loadNumber = ", loadNumber);

  if (loadNumber) {
    console.log("entrou no IF vai chamar");
    try {
      console.log("loadNumber = ", loadNumber);
      const foundLoad = await searchLoad(loadNumber);
      console.log("foundLoad = ", foundLoad);

      if (foundLoad !== null) {
        res.status(200).json(foundLoad);
      } else {
        res.status(404).send("Load not found");
      }
    } catch (error: any) {
      console.error("Error searching load:", error.message);
      res.status(500).send("Error searching load");
    }
  } else {
    res.status(400).send("Invalid load number");
  }
});

export default loadRouter;
