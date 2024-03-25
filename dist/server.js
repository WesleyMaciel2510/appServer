"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fireBaseTest_1 = require("./fireBaseTest");
const users_1 = __importDefault(require("./mock/users"));
const ip_1 = __importDefault(require("ip"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.listen(port, () => {
    const ipAddresses = ip_1.default.address(); // Call the function to get IP addresses
    console.log(`Server listening on addresses: ${ipAddresses}:${port}`);
});
app.get("/", (req, res) => {
    res.send("Hello from the server!");
});
app.get("/api/users", (req, res) => {
    res.json(users_1.default);
});
app.post("/api/users", (req, res) => {
    console.log("POST CALLED");
    users_1.default.push(req.body);
    res.status(201).send("User registered succesfully!");
});
(0, fireBaseTest_1.testFirebase)();
//# sourceMappingURL=server.js.map