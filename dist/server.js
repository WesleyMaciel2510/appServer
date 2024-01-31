"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const admin = __importStar(require("firebase-admin"));
const serviceAccount = require("../keys/appserver-2510-firebase-adminsdk-ql8my-2886040fa5.json");
const requestIp = require("request-ip");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://appserver-2510-default-rtdb.firebaseio.com",
});
const database = admin.database();
const auth = admin.auth();
const app = (0, express_1.default)();
const port = 5000;
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
const server = (0, http_1.createServer)(() => {
    console.log("Hello World!");
});
//=========================================================================
// Test call to verify Firebase Admin SDK is working
const testFirebase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firestore = admin.firestore();
        const productsCollection = firestore.collection("products");
        const querySnapshot = yield productsCollection.get();
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
        console.log("Firebase Admin SDK initialization successful!");
    }
    catch (error) {
        console.error("Error with Firebase Admin SDK:", error.message);
    }
});
//=========================================================================
app.use(requestIp.mw());
app.use(function (req, res) {
    const ip = req.clientIp;
    console.log("Client IP: ", ip);
    res.end(ip);
});
//=========================================================================
testFirebase();
//# sourceMappingURL=server.js.map