import express from "express";
import {
  getUsers,
  createUser,
  getUserByIndex,
  updateUser,
  deleteUser,
} from "../database/index";

const userRouter = express.Router();
// POST-CREATE ============================================
userRouter.post("/", async (req, res) => {
  console.log("POST CALLED");
  try {
    const userData = req.body;

    await createUser(userData);

    res.status(200).send("User added successfully");
  } catch (error: any) {
    console.error("Error adding user:", error.message);
    res.status(500).send("Error adding user");
  }
});

// GET-READ ===============================================
userRouter.get("/", async (req, res) => {
  console.log("GET CALLED");
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error: any) {
    console.error("Error getting users:", error.message);
    res.status(500).send("Error getting users");
  }
});

userRouter.get("/:INDEX", async (req, res) => {
  const userIndex = req.params.INDEX;
  if (parseInt(userIndex) >= 0) {
    const foundUser = await getUserByIndex(userIndex);

    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).send(`User with Index ${userIndex} not found.`);
    }
  } else {
    res.status(400).send(`User ID ${userIndex} is not valid.`);
  }
});

// PUT-UPDATE =============================================
userRouter.put("/:Index", async (req, res) => {
  console.log("PUT CALLED");
  const userIndex = req.params.Index;
  if (parseInt(req.params.Index) > 0) {
    try {
      const result = await updateUser(userIndex, req.body);
      if (result) {
        res.send(`User updated successfully!`);
      } else {
        res.status(404).send(`User with Index ${req.params.Index} not found.`);
      }
    } catch (error: any) {
      console.error("Error updating user:", error.message);
      res.status(500).send("Error updating user");
    }
  } else {
    res.status(404).send(`User with Index ${req.params.Index} is not valid.`);
  }
});
// DELETE =================================================
userRouter.delete("/:Index", async (req, res) => {
  console.log("DELETE CALLED");
  const userIndex = req.params.Index;
  if (parseInt(req.params.Index) > 0) {
    try {
      const result = await deleteUser(userIndex);
      if (result) {
        res.send(`User deleted successfully!`);
      } else {
        res.status(404).send(`User with Index ${req.params.Index} not found.`);
      }
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
      res.status(500).send("Error updating user");
    }
  } else {
    res.status(404).send(`User with Index ${req.params.Index} is not valid.`);
  }
});

export default userRouter;
