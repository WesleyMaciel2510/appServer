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

// src/database/user/index.tsx
var user_exports = {};
__export(user_exports, {
  createUser: () => createUser,
  deleteUser: () => deleteUser,
  getUserByIndex: () => getUserByIndex,
  getUsers: () => getUsers,
  logUserIn: () => logUserIn,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser,
  deleteUser,
  getUserByIndex,
  getUsers,
  logUserIn,
  updateUser
});
