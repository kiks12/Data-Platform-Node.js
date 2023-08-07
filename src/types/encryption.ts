export interface Encryption {
  encryptString: (string: string | Buffer) => Promise<string>;
  correctPassword: (plainString: string, hashedString: string) => Promise<boolean>
}