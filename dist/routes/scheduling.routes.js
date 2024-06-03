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

// src/routes/scheduling.routes.ts
var scheduling_routes_exports = {};
__export(scheduling_routes_exports, {
  default: () => scheduling_routes_default
});
module.exports = __toCommonJS(scheduling_routes_exports);
var import_express = __toESM(require("express"));

// src/database/schedulings/searchScheduling.tsx
var admin = __toESM(require("firebase-admin"));
var searchScheduling = (schedulingNumber) => __async(void 0, null, function* () {
  console.log("chamou searchScheduling");
  try {
    const schedulingRef = admin.database().ref("AgroSync/Scheduling");
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
var schedulingRouter = import_express.default.Router();
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
