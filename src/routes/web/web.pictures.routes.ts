import express from "express";
import bodyParser from "body-parser";
import { searchPictures } from "../../database/pictures";

const webPicturesRouter = express.Router();
webPicturesRouter.use(bodyParser.urlencoded({ limit: "100mb" }));

// GET-CREATE ============================================
webPicturesRouter.get("/get-pictures", async (req, res) => {
  console.log("GET PICTURES CALLED");
  try {
    console.log("chegou no try");
    const { IDTYPE, ID } = req.query;

    // Ensure IDTYPE and ID are properly typed and valid
    if (typeof IDTYPE !== "string" || typeof ID !== "string") {
      return res.status(400).send("Invalid parameters");
    }

    if (IDTYPE !== "LOADID" && IDTYPE !== "SCHEDULINGID") {
      return res.status(400).send("Invalid IDTYPE");
    }

    const indexNumber = parseInt(ID, 10);
    console.log("indexNumber = ", indexNumber);

    const result = await searchPictures(IDTYPE, indexNumber);

    console.log("typeof result = ", typeof result);

    res.status(200).send(result);
  } catch (error: any) {
    console.error("Error getting Picture:", error.message);
    res.status(500).send("Error sending Picture");
  }
});

webPicturesRouter.get("/search-pictures", async (req, res) => {
  console.log("GET PICTURES CALLED");
  try {
    console.log("chegou no try");
    const { IDTYPE, ID } = req.query;

    // Ensure IDTYPE and ID are properly typed and valid
    if (typeof IDTYPE !== "string" || typeof ID !== "string") {
      return res.status(400).send("Invalid parameters");
    }

    if (IDTYPE !== "LOADID" && IDTYPE !== "SCHEDULINGID") {
      return res.status(400).send("Invalid IDTYPE");
    }

    const idNumber = parseInt(ID, 10);
    console.log("idNumber = ", idNumber);

    const result = await searchPictures(IDTYPE, idNumber);

    console.log("typeof result = ", typeof result);

    res.status(200).send(result);
  } catch (error: any) {
    console.error("Error searching Picture:", error.message);
    res.status(500).send("Error sending Picture");
  }
});

export default webPicturesRouter;
