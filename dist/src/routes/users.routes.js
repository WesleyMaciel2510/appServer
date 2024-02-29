"use strict";
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
const index_1 = require("../database/index");
const userRouter = express_1.default.Router();
// POST-CREATE ============================================
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        yield (0, index_1.createUser)(userData);
        res.status(200).send("User added successfully");
    }
    catch (error) {
        console.error("Error adding user:", error.message);
        res.status(500).send("Error adding user");
    }
}));
// GET-READ ===============================================
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, index_1.getUsers)();
        res.json(users);
    }
    catch (error) {
        console.error("Error getting users:", error.message);
        res.status(500).send("Error getting users");
    }
}));
// PUT-UPDATE =============================================
// DELETE =================================================
exports.default = userRouter;
//# sourceMappingURL=users.routes.js.map