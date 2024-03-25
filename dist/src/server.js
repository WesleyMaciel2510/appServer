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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const ip_1 = __importDefault(require("ip"));
const admin = __importStar(require("firebase-admin"));
const fireBaseTest_1 = require("./services/fireBaseTest");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/api/users", users_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});
app.listen(port, () => {
    const ipAddresses = ip_1.default.address();
    console.log(`Server listening on addresses: http://${ipAddresses}:${port}`);
});
(0, fireBaseTest_1.testFirebase)();
exports.database = admin.database();
//# sourceMappingURL=server.js.map