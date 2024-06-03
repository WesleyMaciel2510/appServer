import express from "express";
import ip from "ip";
import * as admin from "firebase-admin";
import { testFirebase } from "./services/fireBaseTest";
import {
  userRouter,
  loadRouter,
  schedulingRouter,
  picturesRouter,
<<<<<<< Updated upstream
} from "./routes/index";
=======
} from "./routes/mobile/index";
import { webUserRouter, webPicturesRouter } from "./routes/web/index";
>>>>>>> Stashed changes
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

// Increase limit for parsing JSON bodies
app.use(bodyParser.json({ limit: "100mb" }));

// Increase limit for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(express.json());
app.use("/api/users", userRouter);
<<<<<<< Updated upstream
=======
app.use("/api/webUsers", webUserRouter);
app.use("/api/webPictures", webPicturesRouter);
>>>>>>> Stashed changes
app.use("/api/loads", loadRouter);
app.use("/api/schedulings", schedulingRouter);
app.use("/api/pictures", picturesRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.listen(port, () => {
  const ipAddresses = ip.address();
  console.log(`Server listening on addresses: http://${ipAddresses}:${port}`);
});

testFirebase();

export const database = admin.database();
