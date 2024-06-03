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

// src/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  loadRouter: () => loads_routes_default,
  picturesRouter: () => pictures_routes_default,
  schedulingRouter: () => scheduling_routes_default,
  userRouter: () => users_routes_default
});
module.exports = __toCommonJS(routes_exports);

// src/routes/users.routes.ts
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

// src/routes/loads.routes.ts
var import_express2 = __toESM(require("express"));

// src/database/loads/searchLoad.tsx
var admin7 = __toESM(require("firebase-admin"));
var searchLoad = (loadNumber) => __async(void 0, null, function* () {
  console.log("chamou searchLoad");
  try {
    const loadsRef = admin7.database().ref("AgroSync/Loads");
    const snapshot = yield loadsRef.once("value");
    const foundLoads = [];
    if (snapshot.exists() && snapshot.hasChildren()) {
      snapshot.forEach((childSnapshot) => {
        const loadObject = childSnapshot.val();
        if (loadObject.ID === loadNumber) {
          foundLoads.push(loadObject);
        }
      });
      return foundLoads;
    } else {
      console.log("No loads found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting load:", error);
    throw error;
  }
});

// src/routes/loads.routes.ts
var loadRouter = import_express2.default.Router();
loadRouter.get("/:LOADNUMBER", (req, res) => __async(void 0, null, function* () {
  console.log("GET loadRouter CALLED");
  const loadNumberString = req.params.LOADNUMBER;
  const loadNumber = parseInt(loadNumberString, 10);
  console.log("loadNumber = ", loadNumber);
  if (loadNumber) {
    console.log("entrou no IF vai chamar");
    try {
      console.log("loadNumber = ", loadNumber);
      const foundLoad = yield searchLoad(loadNumber);
      console.log("foundLoad = ", foundLoad);
      if (foundLoad !== null) {
        res.status(200).json(foundLoad);
      } else {
        res.status(404).send("Load not found");
      }
    } catch (error) {
      console.error("Error searching load:", error.message);
      res.status(500).send("Error searching load");
    }
  } else {
    res.status(400).send("Invalid load number");
  }
}));
var loads_routes_default = loadRouter;

// src/routes/scheduling.routes.ts
var import_express3 = __toESM(require("express"));

// src/database/schedulings/searchScheduling.tsx
var admin8 = __toESM(require("firebase-admin"));
var searchScheduling = (schedulingNumber) => __async(void 0, null, function* () {
  console.log("chamou searchScheduling");
  try {
    const schedulingRef = admin8.database().ref("AgroSync/Scheduling");
    const snapshot = yield schedulingRef.once("value");
    console.log("schedulingRef = ", schedulingRef);
    console.log("snapshot = ", snapshot);
    const foundScheduling = [];
    if (snapshot.exists() && snapshot.hasChildren()) {
      snapshot.forEach((childSnapshot) => {
        const schedulingObject = childSnapshot.val();
        console.log("schedulingObject = ", schedulingObject);
        console.log(
          "schedulingObject.IDAgendamento = ",
          schedulingObject.IDAgendamento
        );
        console.log("schedulingNumber = ", schedulingNumber);
        if (schedulingObject.IDAgendamento === schedulingNumber) {
          foundScheduling.push(schedulingObject);
        }
      });
      return foundScheduling;
    } else {
      console.log("No scheduling found.");
      return [];
    }
  } catch (error) {
    console.error("Error getting scheduling:", error);
    throw error;
  }
});

// src/routes/scheduling.routes.ts
var schedulingRouter = import_express3.default.Router();
schedulingRouter.get("/:SCHEDULINGNUMBER", (req, res) => __async(void 0, null, function* () {
  console.log("GET schedulingRouter CALLED");
  const schedulingNumberString = req.params.SCHEDULINGNUMBER;
  const schedulingNumber = parseInt(schedulingNumberString, 10);
  console.log("schedulingNumber = ", schedulingNumber);
  if (schedulingNumber) {
    console.log("entrou no schedulingNumber IF vai chamar");
    try {
      console.log("schedulingNumber = ", schedulingNumber);
      const foundScheduling = yield searchScheduling(schedulingNumber);
      console.log("foundScheduling = ", foundScheduling);
      if (foundScheduling !== null) {
        res.status(200).json(foundScheduling);
      } else {
        res.status(404).send("Scheduling not found");
      }
    } catch (error) {
      console.error("Error searching scheduling:", error.message);
      res.status(500).send("Error searching scheduling");
    }
  } else {
    res.status(400).send("Invalid scheduling number");
  }
}));
var scheduling_routes_default = schedulingRouter;

// src/routes/pictures.routes.ts
var import_express4 = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));

// src/database/pictures/sendPictures.tsx
var admin9 = __toESM(require("firebase-admin"));
var sendPictures = (pictureData) => __async(void 0, null, function* () {
  console.log("chamou sendPictures");
  console.log("PictureData = ", pictureData);
  console.log("PictureData.IDTYPE = ", pictureData.IDTYPE);
  try {
    let picturesRef, snapshot;
    if (pictureData.IDTYPE === "SCHEDULINGID") {
      picturesRef = admin9.database().ref("AgroSync/Pictures/schedulings");
      snapshot = yield picturesRef.once("value");
    } else {
      picturesRef = admin9.database().ref("AgroSync/Pictures/loads");
      snapshot = yield picturesRef.once("value");
    }
    const snapshotPictures = snapshot.val() || {};
    const newIndex = snapshotPictures ? Object.keys(snapshotPictures).length : 0;
    console.log("newIndex.toString() = ", newIndex.toString());
    yield picturesRef.child(newIndex.toString()).set(pictureData);
  } catch (error) {
    console.error("Error getting scheduling:", error);
    throw error;
  }
});

// src/routes/pictures.routes.ts
var picturesRouter = import_express4.default.Router();
picturesRouter.use(import_body_parser.default.urlencoded({ limit: "100mb" }));
picturesRouter.post("/", (req, res) => __async(void 0, null, function* () {
  console.log("POST CALLED");
  try {
    console.log("chegou no try");
    const pictureData = req.body;
    console.log("Request Body Size:", JSON.stringify(pictureData).length);
    yield sendPictures(pictureData);
    res.status(200).send("Picture sent successfully");
  } catch (error) {
    console.error("Error sending Picture:", error.message);
    res.status(500).send("Error sending Picture");
  }
}));
var pictures_routes_default = picturesRouter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadRouter,
  picturesRouter,
  schedulingRouter,
  userRouter
});
