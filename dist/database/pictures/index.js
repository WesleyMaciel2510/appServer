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

// src/database/pictures/index.tsx
var pictures_exports = {};
__export(pictures_exports, {
  sendPictures: () => sendPictures
});
module.exports = __toCommonJS(pictures_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendPictures
});
