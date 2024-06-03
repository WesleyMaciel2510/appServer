"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/routes/users.routes.ts
var users_routes_exports = {};
__export(users_routes_exports, {
  default: () => users_routes_default
});
module.exports = __toCommonJS(users_routes_exports);
var import_express = __toESM(require("express"));

// src/database/user/getUser.tsx
var admin = __toESM(require("firebase-admin"));
var getUsers = () => __async(void 0, null, function* () {
  try {
    const ref = admin.database().ref("AgroSync/Users");
    const snapshot = yield ref.once("value");
    const users = snapshot.val();
    return users;
  } catch (error) {
    console.error("Error getting users:", error.message);
    throw error;
  }
});

// src/database/user/createUser.tsx
var admin2 = __toESM(require("firebase-admin"));
var createUser = (userData) => __async(void 0, null, function* () {
  try {
    const usersRef = admin2.database().ref("AgroSync/Users");
    const snapshot = yield usersRef.once("value");
    const currentUsers = snapshot.val() || {};
    const newIndex = currentUsers ? Object.keys(currentUsers).length : 0;
    yield usersRef.child(newIndex.toString()).set(userData);
    console.log("New user added successfully.");
  } catch (error) {
    console.error("Error creating user:", error);
  }
});

// src/database/user/getUserByIndex.tsx
var admin3 = __toESM(require("firebase-admin"));
var getUserByIndex = (userIndex) => __async(void 0, null, function* () {
  try {
    const usersRef = admin3.database().ref("AgroSync/Users");
    const snapshot = usersRef.orderByKey().equalTo(userIndex).once("value");
    const user = snapshot;
    return user;
  } catch (error) {
    console.error(`Error getting user with Index ${userIndex}:`, error.message);
    throw error;
  }
});

// src/database/user/updateUser.tsx
var admin4 = __toESM(require("firebase-admin"));
var updateUser = (index, newUser) => __async(void 0, null, function* () {
  try {
    const usersRef = admin4.database().ref("AgroSync/Users");
    const snapshot = yield usersRef.orderByKey().equalTo(index).once("value");
    if (snapshot.exists()) {
      const userKey = Object.keys(snapshot.val())[0];
      yield usersRef.child(userKey).update(newUser);
      return `User with Index ${index} updated successfully.`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
  }
});

// src/database/user/deleteUser.tsx
var admin5 = __toESM(require("firebase-admin"));
var deleteUser = (index) => __async(void 0, null, function* () {
  try {
    const usersRef = admin5.database().ref("AgroSync/Users");
    const snapshot = yield usersRef.orderByKey().equalTo(index).once("value");
    if (snapshot.exists()) {
      const userKey = Object.keys(snapshot.val())[0];
      yield usersRef.child(userKey).remove();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
});

// src/database/user/logUserIn.tsx
var admin6 = __toESM(require("firebase-admin"));
var logUserIn = (email, password) => __async(void 0, null, function* () {
  try {
    const ref = admin6.database().ref("AgroSync/Users");
    const snapshot = yield ref.once("value");
    const users = snapshot.val();
    console.log("chamou logUserIn = ", logUserIn);
    for (let userId in users) {
      let user = users[userId];
      if (user.Email === email) {
        const passwordIsCorrect = user.Password === password ? true : false;
        return { user, passwordIsCorrect };
      }
    }
    return null;
  } catch (error) {
    console.error("Error loggin user:", error.message);
    throw error;
  }
});

// src/routes/users.routes.ts
var userRouter = import_express.default.Router();
userRouter.post("/", (req, res) => __async(void 0, null, function* () {
  console.log("POST CALLED");
  try {
    const userData = req.body;
    yield createUser(userData);
    res.status(200).send("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error.message);
    res.status(500).send("Error adding user");
  }
}));
userRouter.post("/login", (req, res) => __async(void 0, null, function* () {
  try {
    console.log("CHEGOU NA ROTA LOGIN");
    console.log("req.body = ", req.body);
    const { Email: email, Password: password } = req.body;
    const result = yield logUserIn(email, password);
    console.log("passwordIsCorrect = ", result == null ? void 0 : result.passwordIsCorrect);
    if (result === null) {
      console.log("result === null");
      res.status(404).send("User not found");
    } else if (!result.passwordIsCorrect) {
      console.log("!result.passwordIsCorrect");
      res.status(401).send("Incorrect password");
    } else {
      console.log("result returned = ", result.user);
      res.status(200).send(result.user);
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send("Internal Server Error");
  }
}));
userRouter.get("/", (req, res) => __async(void 0, null, function* () {
  console.log("GET CALLED");
  try {
    const users = yield getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).send("Error getting users");
  }
}));
userRouter.get("/:INDEX", (req, res) => __async(void 0, null, function* () {
  const userIndex = req.params.INDEX;
  if (parseInt(userIndex) >= 0) {
    const foundUser = yield getUserByIndex(userIndex);
    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      res.status(404).send(`User with Index ${userIndex} not found.`);
    }
  } else {
    res.status(400).send(`User ID ${userIndex} is not valid.`);
  }
}));
userRouter.put("/:Index", (req, res) => __async(void 0, null, function* () {
  console.log("PUT CALLED");
  const userIndex = req.params.Index;
  if (parseInt(req.params.Index) >= 0) {
    try {
      const result = yield updateUser(userIndex, req.body);
      if (result) {
        res.send(`User updated successfully!`);
      } else {
        res.status(404).send(`User with Index ${req.params.Index} not found.`);
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      res.status(500).send("Error updating user");
    }
  } else {
    res.status(404).send(`User with Index ${req.params.Index} is not valid.`);
  }
}));
userRouter.delete("/:Index", (req, res) => __async(void 0, null, function* () {
  console.log("DELETE CALLED");
  const userIndex = req.params.Index;
  if (parseInt(req.params.Index) >= 0) {
    try {
      const result = yield deleteUser(userIndex);
      if (result) {
        res.send(`User deleted successfully!`);
      } else {
        res.status(404).send(`User with Index ${req.params.Index} not found.`);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      res.status(500).send("Error updating user");
    }
  } else {
    res.status(404).send(`User with Index ${req.params.Index} is not valid.`);
  }
}));
var users_routes_default = userRouter;
