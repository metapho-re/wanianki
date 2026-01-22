const normalize = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, "");

export const getDiceCoefficient = (s1: string, s2: string): number => {
  const str1 = normalize(s1);
  const str2 = normalize(s2);

  if (str1.length < 2 || str2.length < 2) {
    return 0;
  }

  const counts = new Map<string, number>();

  for (let i = 0; i < str1.length - 1; i++) {
    const bigram = `${str1[i]}${str1[i + 1]}`;

    counts.set(bigram, (counts.get(bigram) || 0) + 1);
  }

  let intersection = 0;

  for (let i = 0; i < str2.length - 1; i++) {
    const bigram = `${str2[i]}${str2[i + 1]}`;
    const count = counts.get(bigram) || 0;

    if (count > 0) {
      intersection++;
      counts.set(bigram, count - 1);
    }
  }

  return (2 * intersection) / (str1.length + str2.length - 2);
};
