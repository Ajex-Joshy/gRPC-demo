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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetUser_1 = require("./src/application/use-cases/GetUser");
const mongo_1 = require("./src/infrastructure/db/mongo");
const MongoUserRepository_1 = require("./src/infrastructure/db/MongoUserRepository");
const OrderClient_1 = require("./src/infrastructure/grpc/OrderClient");
const UserController_1 = require("./src/interfaces/grpc/UserController");
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const node_path_1 = __importDefault(require("node:path"));
require("dotenv/config");
class InMemoryUserRepository {
    users = [
        { id: "u1", name: "Ajex Joshy", email: "ajex@example.com" },
        { id: "u2", name: "Demo User", email: "demo@example.com" },
    ];
    async findById(id) {
        const user = this.users.find((entry) => entry.id === id);
        return user ?? null;
    }
}
const userProtoPath = node_path_1.default.resolve(process.cwd(), "../proto/user.proto");
async function buildUserRepository() {
    if (process.env.USE_IN_MEMORY_DEMO === "true" || !process.env.MONGO_URI) {
        console.log("Using in-memory user repository");
        return new InMemoryUserRepository();
    }
    try {
        await (0, mongo_1.connectDB)();
        return new MongoUserRepository_1.MonogoUserRepository();
    }
    catch (error) {
        console.warn("Falling back to in-memory user repository");
        return new InMemoryUserRepository();
    }
}
async function start() {
    const repo = await buildUserRepository();
    const orderClient = new OrderClient_1.OrderClient();
    const useCase = new GetUser_1.GetUser(repo, orderClient);
    const controller = new UserController_1.UserController(useCase);
    const def = protoLoader.loadSync(userProtoPath);
    const proto = grpc.loadPackageDefinition(def);
    const server = new grpc.Server();
    server.addService(proto.UserService.service, {
        GetUser: controller.GetUser,
    });
    server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
        console.log("User service running on 50051");
        server.start();
    });
}
start();
//# sourceMappingURL=main.js.map