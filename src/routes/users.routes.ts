import express from "express";
import users from "../mock/users";

const userRouter = express.Router();

// FUNCTIONS
function searchUserWithID(ID: number) {
  return users.find((user) => user.ID === ID);
}
function searchIndexUser(ID: number) {
  const IDRECEBIDO = ID;
  const IDFILTRADO = users.findIndex((user) => user.ID === ID);
  return IDFILTRADO;
}
// ==========================================================
userRouter.get("/", (req, res) => {
  res.json(users);
});

userRouter.get("/:ID", (req, res) => {
  const foundUser = searchUserWithID(parseInt(req.params.ID));
  res.json(foundUser);
});
// ==========================================================
userRouter.post("/", (req, res) => {
  console.log("POST CALLED");
  users.push(req.body);
  res.status(201).send("User registered successfully!");
});
// ==========================================================
userRouter.delete("/:ID", (req, res) => {
  console.log("DELETE CALLED");
  let index = searchIndexUser(parseInt(req.params.ID));
  users.splice(index, 1);
  res.send(`User deleted successfully!`);
});
// ==========================================================
userRouter.put("/:ID", (req, res) => {
  console.log("UPDATE CALLED");
  let index = searchIndexUser(parseInt(req.params.ID));
  //validating to not update if anything is undefined
  req.body.Name !== undefined ? (users[index].Name = req.body.Name) : null;
  req.body.AccessLevel !== undefined
    ? (users[index].AccessLevel = req.body.AccessLevel)
    : null;
  req.body.IsActive !== undefined
    ? (users[index].IsActive = req.body.IsActive)
    : null;
  res.send(`User updated successfully!`);
});

export default userRouter;
