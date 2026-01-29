const taglines = [
  "Because Crabigator said one review wasn't enough.",
  "For when you forgot that kanji... again.",
  "Your shortcut to not feeling like a fraud on level 30.",
  "One more review closer to becoming a kanji wizard.",
  "Because forgetting the same kanji 47 times builds character.",
  "Sure, you totally remembered that radical. This is just for fun.",
  "Extra reviews: because your brain clearly needs a second chance.",
  "You mastered it? Great. Let's review it 12 more times just to be sure.",
  "The Crabigator demands more suffering. We obey.",
  "WaniKani wasn't punishing enough, so we fixed that.",
  "Because enlightenment is just a kanji away... and then 3,000 more.",
  "Review now, cry later. Or during. We don't judge.",
  "Your kanji journey: 10% progress, 90% existential dread.",
  "Because nothing says 'fun' like reviewing 'tree' for the 800th time.",
  "You're not procrastinating. You're strategically avoiding success.",
  "You said you'd remember it. You lied.",
  "Review smarter, not harder. Just kidding — it's all harder.",
  "The only thing you're leveling up is your ability to forget faster.",
];

export const getTagline = (): string =>
  taglines[Math.floor(Math.random() * taglines.length)] as string;
