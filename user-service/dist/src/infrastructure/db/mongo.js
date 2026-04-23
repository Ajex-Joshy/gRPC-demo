"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri)
            throw new Error("MONGO_URI is not defined in environment variables");
        await mongoose_1.default.connect(uri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=mongo.js.map