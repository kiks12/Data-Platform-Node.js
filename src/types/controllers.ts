import { User } from "@prisma/client";

export interface IUserController {
  createUser: (user: User) => {}
  getUser: (email: string) => Promise<User | null>
}