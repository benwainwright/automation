export const getTimeout = (end: Date, offsetInMinutes: number) => {
  return end.getTime() - Date.now() - 1000 * 60 * offsetInMinutes;
};
