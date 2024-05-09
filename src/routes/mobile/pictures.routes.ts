import express from "express";
import bodyParser from "body-parser";
import { sendPictures } from "../../database/pictures";

const picturesRouter = express.Router();
picturesRouter.use(bodyParser.urlencoded({ limit: "100mb" }));

// POST-CREATE ============================================
picturesRouter.post("/", async (req, res) => {
  console.log("POST CALLED");
  try {
    console.log("chegou no try");
    const pictureData = req.body;
    console.log("Request Body Size:", JSON.stringify(pictureData).length);

    await sendPictures(pictureData);

    res.status(200).send("Picture sent successfully");
  } catch (error: any) {
    console.error("Error sending Picture:", error.message);
    res.status(500).send("Error sending Picture");
  }
});

export default picturesRouter;
