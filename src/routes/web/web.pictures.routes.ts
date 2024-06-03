import express from "express";
import bodyParser from "body-parser";
import { getPictures } from "../../database/pictures";

const webPicturesRouter = express.Router();
webPicturesRouter.use(bodyParser.urlencoded({ limit: "100mb" }));

// GET-CREATE ============================================
webPicturesRouter.get("/get-pictures", async (req, res) => {
  console.log("GET PICTURES CALLED");
  try {
    console.log("chegou no try");
    const IDTYPE = "SCHEDULINGID";
    const INDEX = 0;
    //IDTYPE: "LOADID" | "SCHEDULINGID"
    const result = await getPictures(IDTYPE, INDEX);
    console.log("result = ", result);

    res.status(200).send(result);
  } catch (error: any) {
    console.error("Error sending Picture:", error.message);
    res.status(500).send("Error sending Picture");
  }
});

export default webPicturesRouter;
