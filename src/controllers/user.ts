
import { User } from "@prisma/client";
import users from "../models/user";
import { IUserController } from "../types/controllers";

class UserController implements IUserController {
  public constructor() {}

  public async createUser(user: User) {
    try {
      return await users.create({ data: user })
    } catch (err) {
      console.error(err)
    }
  }

  public async getUser(email: string){ 
    try {
      return await users.findFirst({
        where: {
          email: email,
        }
      });
    } catch (err) {
      console.error(err)
      return null 
    }
  }
}


export default UserController;