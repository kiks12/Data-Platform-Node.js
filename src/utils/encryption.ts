// IMPORT TYPES 
import { CorrectPasswordFunction, EncryptStringFunction } from "../types/encryption";

import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const encryptString: EncryptStringFunction = async (str: string | Buffer) => {
  try {
    return await bcrypt.hash(str, SALT_ROUNDS)
  } catch (err) {
    console.error(err)
    return ""
  }
}

export const correctPassword: CorrectPasswordFunction = async (
  plainPassword: string, 
  hashedPassword: string
) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword)
  } catch (err) {
    console.error(err)
    return false
  }
} 