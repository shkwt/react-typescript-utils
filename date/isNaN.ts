export const isNaN = (value?: string | number | Date | null) => {
  if(value === null || value === undefined || value === ' ') return true;
  const n = Number(value);
  return n !== n;
};