import express from "express";
import ip from "ip";
import * as admin from "firebase-admin";
import { testFirebase } from "./services/fireBaseTest";
import {
  userRouter,
  loadRouter,
  schedulingRouter,
  picturesRouter,
} from "./routes/mobile/index";
import { webUserRouter } from "./routes/web/index";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Increase limit for parsing JSON bodies
app.use(express.json({ limit: "100mb" }));

// Increase limit for parsing URL-encoded bodies
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/webUsers", webUserRouter);
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
