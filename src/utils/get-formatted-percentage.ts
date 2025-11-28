export const getFormattedPercentage = (
  correct: number,
  total: number,
): string => {
  if (total === 0) {
    return "0%";
  }

  return `${((correct / total) * 100).toFixed(0)}%`;
};
