import express from "express";
import ip from "ip";
import * as admin from "firebase-admin";
import { testFirebase } from "./services/fireBaseTest";
import { userRouter, loadRouter, schedulingRouter } from "./routes/index";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/loads", loadRouter);
app.use("/api/schedulings", schedulingRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.listen(port, () => {
  const ipAddresses = ip.address();
  console.log(`Server listening on addresses: http://${ipAddresses}:${port}`);
});

testFirebase();

export const database = admin.database();
