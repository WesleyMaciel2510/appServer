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

// src/routes/pictures.routes.ts
var pictures_routes_exports = {};
__export(pictures_routes_exports, {
  default: () => pictures_routes_default
});
module.exports = __toCommonJS(pictures_routes_exports);
var import_express = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));

// src/database/pictures/sendPictures.tsx
var admin = __toESM(require("firebase-admin"));
var sendPictures = (pictureData) => __async(void 0, null, function* () {
  console.log("chamou sendPictures");
  console.log("PictureData = ", pictureData);
  console.log("PictureData.IDTYPE = ", pictureData.IDTYPE);
  try {
    let picturesRef, snapshot;
    if (pictureData.IDTYPE === "SCHEDULINGID") {
      picturesRef = admin.database().ref("AgroSync/Pictures/schedulings");
      snapshot = yield picturesRef.once("value");
    } else {
      picturesRef = admin.database().ref("AgroSync/Pictures/loads");
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
var picturesRouter = import_express.default.Router();
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
