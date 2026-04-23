import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserModel } from "./models/UserModel";

export class MonogoUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const data = await UserModel.findById(id).lean();

      if (!data) return null;

      return new User(data._id.toString(), data.name, data.email);
    } catch (error) {
      throw new Error("Error connecting to database");
    }
  }
}
