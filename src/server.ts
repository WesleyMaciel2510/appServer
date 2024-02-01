import express from "express";
import { createServer } from "http";
import { testFirebase } from "./fireBaseTest";
import users from "./mock/users";
import userRouter from "./routes/users.routes";
import ip from "ip";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
app.listen(port, () => {
  const ipAddresses = ip.address();
  console.log(`Server listening on addresses: http://localhost:${port}`);
  console.log(`IP === ${ipAddresses}`);
});

testFirebase();
/* //===========================================================
// FUNCTIONS
function searchUserID(ID: number) {
  return users.find((user) => user.ID == ID);
}
//===========================================================
app.get("/api/users", (req, res) => {
  res.json(users);
});
//===========================================================
app.get("/api/users/:ID", (req, res) => {
  const foundUser = searchUserID(parseInt(req.params.ID));
  res.json(foundUser);
});
//===========================================================
app.post("/api/users", (req, res) => {
  console.log("POST CALLED");
  users.push(req.body);
  res.status(201).send("User registered succesfully!");
}); */
//===========================================================
