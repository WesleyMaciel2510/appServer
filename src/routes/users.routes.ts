import { Router } from "express";
import users from "../mock/users";

const userRouter = Router();

//===========================================================
// FUNCTIONS
function searchUserID(ID: number) {
  return users.find((user) => user.ID == ID);
}
//===========================================================
userRouter.get("/api/users", (req, res) => {
  res.json(users);
});
//===========================================================
userRouter.get("/api/users/:ID", (req, res) => {
  const foundUser = searchUserID(parseInt(req.params.ID));
  res.json(foundUser);
});
//===========================================================
userRouter.post("/api/users", (req, res) => {
  console.log("POST CALLED");
  users.push(req.body);
  res.status(201).send("User registered succesfully!");
});

export default userRouter;
