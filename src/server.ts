import express from "express";
import { userRouter, loadRouter } from "./routes/index";
import ip from "ip";
import * as admin from "firebase-admin";
import { testFirebase } from "./services/fireBaseTest";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/loads", loadRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.listen(port, () => {
  const ipAddresses = ip.address();
  console.log(`Server listening on addresses: http://${ipAddresses}:${port}`);
});

testFirebase();

export const database = admin.database();
