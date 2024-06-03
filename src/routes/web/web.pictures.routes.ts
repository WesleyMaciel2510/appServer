import express from "express";
import bodyParser from "body-parser";
import { getPictures, searchPictures } from "../../database/pictures";

const webPicturesRouter = express.Router();
webPicturesRouter.use(bodyParser.urlencoded({ limit: "100mb" }));

// GET-CREATE ============================================
webPicturesRouter.get("/get-pictures", async (req, res) => {
  console.log("GET PICTURES CALLED");
  try {
    console.log("chegou no try");
    const { IDTYPE, INDEX } = req.query;
    console.log("IDTYPE = ", typeof IDTYPE);
    console.log("INDEX = ", typeof INDEX);

    // Ensure IDTYPE and INDEX are properly typed and valid
    if (typeof IDTYPE !== "string" || typeof INDEX !== "string") {
      return res.status(400).send("Invalid parameters");
    }

    if (IDTYPE !== "LOADID" && IDTYPE !== "SCHEDULINGID") {
      return res.status(400).send("Invalid IDTYPE");
    }

    const indexNumber = parseInt(INDEX, 10);
    if (isNaN(indexNumber)) {
      return res.status(400).send("Invalid INDEX");
    }
    console.log("indexNumber = ", indexNumber);

    const result = await getPictures(IDTYPE, indexNumber);

    console.log("Result: ", result);

    if (!result) {
      return res.status(404).send("Picture not found");
    }

    res.status(200).send({ success: true, data: result });
  } catch (error: any) {
    console.error("Error getting Picture:", error.message);
    res.status(500).send({ success: false, message: "Error sending Picture" });
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
