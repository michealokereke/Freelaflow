export const parsePositiveInt = (value: unknown, fallback: number): number => {
  const str = String(value);
  if (!/^\d+$/.test(str)) return fallback;
  const num = Number(str);
  return Number.isInteger(num) && num > 0 ? num : fallback;
};
