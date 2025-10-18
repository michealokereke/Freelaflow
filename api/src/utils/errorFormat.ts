interface ErrrorFormatT extends Error {
  status?: number;
}

export const errorFormat = (msg: string, status?: number) => {
  const error: ErrrorFormatT = new Error(msg);
  error.status = status || 500;
  return error;
};
