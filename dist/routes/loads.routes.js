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

// src/routes/loads.routes.ts
var loads_routes_exports = {};
__export(loads_routes_exports, {
  default: () => loads_routes_default
});
module.exports = __toCommonJS(loads_routes_exports);
var import_express = __toESM(require("express"));

// src/database/loads/searchLoad.tsx
var admin = __toESM(require("firebase-admin"));
var searchLoad = (loadNumber) => __async(void 0, null, function* () {
  console.log("chamou searchLoad");
  try {
    const loadsRef = admin.database().ref("AgroSync/Loads");
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
var loadRouter = import_express.default.Router();
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
