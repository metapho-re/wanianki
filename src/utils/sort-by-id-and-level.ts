export const sortByIdAndLevel = <
  T extends { id: number; data: { level: number } },
>(
  array: T[],
): void => {
  array.sort((a, b) => a.id - b.id).sort((a, b) => a.data.level - b.data.level);
};
