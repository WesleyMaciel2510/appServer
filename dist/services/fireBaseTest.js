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

// src/services/fireBaseTest.tsx
var fireBaseTest_exports = {};
__export(fireBaseTest_exports, {
  testFirebase: () => testFirebase
});
module.exports = __toCommonJS(fireBaseTest_exports);
var admin = __toESM(require("firebase-admin"));

// keys/appserver-2510-firebase-adminsdk-ql8my-2886040fa5.json
var appserver_2510_firebase_adminsdk_ql8my_2886040fa5_default = {
  type: "service_account",
  project_id: "appserver-2510",
  private_key_id: "2886040fa5cd9e4a7d313f71236832d0c4a34de8",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDYlyrzdXDDPcwJ\nl9cD2BxmfAh356Ki0PvA6IpTLiDhqepZSNOfimgDfb5//QfYYdg2CoW30ATH2auP\nvp9GBwSxZ5cuZXFN0F4QKkdq332FxUs2bW7oVbKRE01HuJK9enMfLPNtMUUYh8bA\nAnJKO58FqovbHy9fCWfdxPyjvFi/Lll7XaoArh68gC2NXHcSsXCtDQK6/en6z3+v\nROzz2OO9uqYCF+L4RkVyleqfDvpu93bqVbQ3pNUAPTXLiObllcglBG3KB73QNpT/\nX1GmfqYH6kyi22wSpvwTcuoa2TQDdzcaEF4PkaKZC1/NMEtSyu5QxRKxj2fxADZP\nROlkhs5/AgMBAAECggEAUbYCFbQuNPI46juW+hPLbxyHA1lngX5PJBF2sffantgA\nGewALpXENOD5AAchMRCExaqFlPmM/CqR71puczhNnHIk1nOd4cnk2rtgkyC6lb9/\nZwq1B0Dha5r5EkA/V+18xfuq4HxwgVcj86dYn8nLbhNPzPyAXh3JyiA5Ybo6TvFG\n2Hg+tvOuqPfJkskTut2A4gxFlHIyZmTdwqf3IPajEz2csCIYDpurpFinWbAMi+iv\nIWUkKjUC3jWSzB3g85nHfZrot4hdiEWsNeBf2Ik090HDALWnVu3VuTknxxz2jZW4\ntDp+7D48llErMK062iPhEcmSlMoz9oG/PI8Da7ODmQKBgQD9eyqZbvPasCR83j8o\n7Bn5U7aBSJePbrP9Mw2wNdARFiOiaKu3z2o69mVk8maAuriXUAjN+7ebUNu3m2Oy\nrEggLTDYaV890CdSSdTpmC1Y3VAKoG1jjyImXOnaHiYSWA8BLDBcQJTCOgbj/Kbp\nuuFBFT0vDWY0ym+76nyxCnu5SQKBgQDavienEGfrIYB1CIaYkkrpG+UjI7Nag+oj\nxqjQS1A9aXFQxWS7fQ/ZrPrtY1Dcm14TO4666K7bS3gzC9+ChD/Gh4blzxAqIy24\n98+q/a7kY3G5WeZPqT4EL9MZdVU31P8lBCunDrsuchpHagGHqV9il+CpVrbomqcC\n43424mhRhwKBgQCA5Zbd+wvJ0vRbAvD/MEBtBuKxj2Zyq4qfYMy/JD4v0iBAwBVC\nHRkZ7p3U3Wa+YzTmzO4NQMk3E8EG9t+VxgHPSuuhwMOLvUOhlqXMO3Qj0jaXkMjP\nbcOh2nGYVuhpP5oxsHTPFJAQzE0gtiNyi3NsEw7P1HJ6uc5jsnPB22Da8QKBgQDL\nSua3UXwC/sPQAPh2W5/bPd2a5tcNTIQSc9L4osYUDScPFiUkSnqspyMd9Kt2G782\nyKdB9nZrwJwZdPNo7VgIPnSUp/gx8TfRLB6In/QmtnU++doeNwA4C+p5Qp7MoNvv\nnwyi2gIEjG736AE7/6FylAxr1Pdw/ioxeRQYFhs1iQKBgQDV8xrLLdJ56SqA66Gv\nmJ3zkIR+7D8Ta8fiiiGptFyckCI7et4g3617QVErD+zbabbD99wVUCvq5H7UvcI0\noeO1R2BDD306padsoKVvPhA03H1KvNLGG+Qbgqd4US2C3nRDugYLhR4uPI9wd+W/\n+4AKugaOaw9CZsXbaMgShqeFkg==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-ql8my@appserver-2510.iam.gserviceaccount.com",
  client_id: "101638114556138890118",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ql8my%40appserver-2510.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

// src/services/fireBaseTest.tsx
admin.initializeApp({
  credential: admin.credential.cert(appserver_2510_firebase_adminsdk_ql8my_2886040fa5_default),
  databaseURL: "https://appserver-2510-default-rtdb.firebaseio.com/",
  projectId: "appserver-2510",
  storageBucket: "gs://appserver-2510.appspot.com"
});
var database2 = admin.database();
var auth2 = admin.auth();
var testFirebase = () => __async(void 0, null, function* () {
  try {
    const firestore2 = admin.firestore();
    const productsCollection = firestore2.collection("products");
    const querySnapshot = yield productsCollection.get();
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    console.log("Firebase Admin SDK initialization successful!");
  } catch (error) {
    console.error("Error with Firebase Admin SDK:", error.message);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  testFirebase
});
