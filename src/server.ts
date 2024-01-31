import express from "express";
import { createServer } from "http";
import { testFirebase } from "../fireBaseTest";
import users from "./mock/users";

const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on address: http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/post", (req, res) => {
  console.log("HELLO POST");
  /* console.log("Request Headers:", req.headers);
  console.log("Received data:", req.body); */

  res.json({ message: "Data received successfully" });
});

testFirebase();
