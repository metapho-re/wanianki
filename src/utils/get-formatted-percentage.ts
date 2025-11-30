export const getFormattedPercentage = (
  correct: number,
  total: number,
): string => {
  if (total === 0) {
    return "N/A";
  }

  return `${((correct / total) * 100).toFixed(0)}%`;
};
