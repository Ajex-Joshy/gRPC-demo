"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    useCase;
    constructor(useCase) {
        this.useCase = useCase;
    }
    GetUser = async (call, cb) => {
        try {
            const result = await this.useCase.execute(call.request.id);
            cb(null, {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                orders: result.orders,
            });
        }
        catch (error) {
            cb({
                code: 13,
                message: error.message,
            });
        }
    };
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map