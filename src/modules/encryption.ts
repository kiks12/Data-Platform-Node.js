

import bcrypt from "bcrypt";

import { Encryption } from "../types/encryption";



class PasswordEncryption implements Encryption {
  private readonly SALT_ROUNDS = 10;

  public constructor() {}

  public async encryptString(string: string | Buffer) {
    try {
      return await bcrypt.hash(string, this.SALT_ROUNDS)
    } catch (err) {
      console.error(err)
      return ""
    }
  };

  public async correctPassword(plainString: string, hashedString: string) {
    try {
      return await bcrypt.compare(plainString, hashedString)
    } catch (err) {
      console.error(err)
      return false
    }
  }
}


export default PasswordEncryption