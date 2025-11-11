type Tag = "kanji" | "radical" | "vocabulary" | "meaning" | "reading";

type ReturnValue = {
  tag: Tag | null;
  content: string;
}[];

const regex = /<(\w+)>(.*?)<\/\1>/g;

export const getParsedText = (text: string): ReturnValue => {
  const result: ReturnValue = [];

  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        tag: null,
        content: text.slice(lastIndex, match.index),
      });
    }

    result.push({
      tag: match[1] as Tag,
      content: match[2] as string,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    result.push({
      tag: null,
      content: text.slice(lastIndex),
    });
  }

  return result;
};
