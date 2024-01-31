import express from "express";
import { createServer } from "http";
import { testFirebase } from "./fireBaseTest";
import users from "./mock/users";
import ip from "ip";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  const ipAddresses = ip.address(); // Call the function to get IP addresses
  console.log(`Server listening on addresses: ${ipAddresses}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  console.log("POST CALLED");
  users.push(req.body);
  res.status(201).send("User registered succesfully!");
});

testFirebase();
