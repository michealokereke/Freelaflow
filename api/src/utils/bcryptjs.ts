import { hash, compare } from "bcryptjs";

export const bcryptFunc = {
  hashValue: (password: string, saltRounds: number = 12) =>
    hash(password, saltRounds),
  compareValue: (password: string, passwordHash: string) =>
    compare(password, passwordHash),
};
