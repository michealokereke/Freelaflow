import type { Request } from "express";

export const requestQueryStringer = (req: Request, keys: string[]) => {
  const returnQueries: Record<string, string> = {};

  keys.forEach((key) => {
    // Access dynamic key from req.query
    const rawValue = req.query[key];
    // Convert to string, default empty string if undefined
    returnQueries[key] = String(rawValue || "");
  });

  return returnQueries;
};
