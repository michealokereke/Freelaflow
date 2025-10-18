import { createHash, randomBytes } from "crypto";

export const crypto = {
  sha256: (token: string) => createHash("sha256").update(token).digest("hex"),
  generateToken: () => randomBytes(64).toString("hex"),
};

// export const compareSha256 = (token: string, tokenHash: string) => {
//   const newTokenHAsh = sha256(token);
//   if (newTokenHAsh === tokenHash) return true;
//   else return false;
// };
