import express from "express";
import users from "../mock/users";

const userRouter = express.Router();

// FUNCTIONS
function searchUserID(ID: number) {
  return users.find((user) => user.ID === ID);
}

userRouter.get("/", (req, res) => {
  res.json(users);
});

userRouter.get("/:ID", (req, res) => {
  const foundUser = searchUserID(parseInt(req.params.ID));
  res.json(foundUser);
});

userRouter.post("/", (req, res) => {
  console.log("POST CALLED");
  users.push(req.body);
  res.status(201).send("User registered successfully!");
});

export default userRouter;
