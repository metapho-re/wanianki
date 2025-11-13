export const sortById = <T extends { id: number }>(array: T[]): void => {
  array.sort((a, b) => a.id - b.id);
};
