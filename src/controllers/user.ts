
import { User } from "@prisma/client";
import users from "../models/user";
import { UserController } from "../types/controllers";
import { Encryption } from "../types/encryption";

class UserService implements UserController {
  private readonly encryptor: Encryption;

  public constructor(encryption: Encryption) {
    this.encryptor = encryption
  }

  public async createUser(user: User) {
    try {
      user.password = await this.encryptor.encryptString(user.password)
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


export default UserService;