import express from "express";
import userRouter from "./routes/users.routes";
import ip from "ip";
import * as admin from "firebase-admin";
import { testFirebase } from "./services/fireBaseTest";
//const serviceAccount = require("../keys/appserver-2510-firebase-adminsdk-ql8my-2886040fa5.json");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.listen(port, () => {
  const ipAddresses = ip.address();
  console.log(`Server listening on addresses: http://${ipAddresses}:${port}`);
});

export const database = admin.database();

testFirebase();
