import express from "express";
import cors from "cors";
import { logUserIn } from "../../database/user/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import secretKey from "../../.env/tokenSecretKey";

const webUserRouter = express.Router();

const corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200,
};

webUserRouter.use(cors(corsOptions));

// =====================================================
webUserRouter.post("/login", async (req, res) => {
  try {
    console.log("CHEGOU NA ROTA LOGIN");
    console.log("req.body = ", req.body);
    const { Email: email, Password: password } = req.body;
    const result = await logUserIn(email, password);

    console.log("passwordIsCorrect = ", result?.passwordIsCorrect);
    if (result === null) {
      console.log("result === null");
      res.status(404).send("User not found");
    } else if (!result.passwordIsCorrect) {
      console.log("!result.passwordIsCorrect");
      res.status(401).send("Incorrect password");
    } else {
      console.log("@ USER = ", result.user);
      console.log("secretKey = ", secretKey);
      const token = jwt.sign({ userId: result.user.ID }, secretKey);
      res.status(200).send({ user: result.user, token });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// =====================================================
export default webUserRouter;
