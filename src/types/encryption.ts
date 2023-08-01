
export type EncryptStringFunction = (string: string | Buffer) => Promise<string> 
export type CorrectPasswordFunction = (plainPassword: string, hashedPassword: string) => Promise<boolean>