"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    static async create(userData) {
        const user = new User_1.User(userData);
        return await user.save();
    }
    static async findByEmail(email) {
        return await User_1.User.findOne({ email });
    }
    static async findById(id) {
        return await User_1.User.findById(id);
    }
    static async updateById(id, updateData) {
        return await User_1.User.findByIdAndUpdate(id, updateData, { new: true });
    }
    static async deleteById(id) {
        const result = await User_1.User.findByIdAndDelete(id);
        return !!result;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map