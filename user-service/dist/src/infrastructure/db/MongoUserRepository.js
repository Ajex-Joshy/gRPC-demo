"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonogoUserRepository = void 0;
const User_1 = require("../../domain/entities/User");
const UserModel_1 = require("./models/UserModel");
class MonogoUserRepository {
    async findById(id) {
        try {
            const data = await UserModel_1.UserModel.findById(id).lean();
            if (!data)
                return null;
            return new User_1.User(data._id.toString(), data.name, data.email);
        }
        catch (error) {
            throw new Error("Error connecting to database");
        }
    }
}
exports.MonogoUserRepository = MonogoUserRepository;
//# sourceMappingURL=MongoUserRepository.js.map