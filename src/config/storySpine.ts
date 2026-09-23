export type StoryChapter = {
  id: string;
  index: string;
  title: string;
  tagline: string;
};

export type StoryAct = {
  id: string;
  roman: string;
  title: string;
  hook: string;
  anchorId: string;
};

export const STORY_CHAPTERS: StoryChapter[] = [
  { id: "hero", index: "00", title: "Prologue", tagline: "Before the legend, a boy from Ranchi" },
  { id: "journey", index: "I", title: "The Years", tagline: "2004–2024, frame by frame" },
  { id: "batsman", index: "II", title: "The Blade", tagline: "Positions 1–4 vs the finisher's 5–7" },
  { id: "keeper", index: "III", title: "The Gloves", tagline: "Reflex, stumping, silence behind the stumps" },
  { id: "captain", index: "IV", title: "The Mind", tagline: "Calls that changed matches—and history" },
  { id: "finisher", index: "V", title: "The Calm", tagline: "Death overs, ice in the veins" },
  { id: "trophies", index: "VI", title: "The Vault", tagline: "Silverware earned, not borrowed" },
  { id: "moments", index: "VII", title: "The Reels", tagline: "Scenes you still replay at midnight" },
  { id: "india-csk", index: "VIII", title: "Two Worlds", tagline: "India blue, CSK gold—one heartbeat" },
  { id: "career-matrix", index: "IX", title: "The Archive", tagline: "Every opponent, ground, and season" },
  { id: "era", index: "X", title: "The Mirror", tagline: "Dhoni against his own era" },
  { id: "tribute", index: "XI", title: "A Fan's Note", tagline: "Why this story exists" },
  { id: "legacy", index: "Fin", title: "Epilogue", tagline: "Numbers fade; moments never do" },
];

export const STORY_ACTS: StoryAct[] = [
  {
    id: "awakening",
    roman: "I",
    title: "Awakening",
    hook: "A debut flickers on TV screens. A nation doesn't know it yet, but the script has begun.",
    anchorId: "journey",
  },
  {
    id: "craft",
    roman: "II",
    title: "Craft",
    hook: "Three crafts in one body—bat, gloves, and the captain's quiet chessboard.",
    anchorId: "batsman",
  },
  {
    id: "weight",
    roman: "III",
    title: "Weight of the Armband",
    hook: "When the crowd roars, he listens for the silence between heartbeats.",
    anchorId: "captain",
  },
  {
    id: "climax",
    roman: "IV",
    title: "Climax",
    hook: "Trophies gleam, reels loop forever, and Chennai yellow meets India blue.",
    anchorId: "trophies",
  },
  {
    id: "record",
    roman: "V",
    title: "The Record Room",
    hook: "Pull the files. Compare the eras. Let the warehouse speak.",
    anchorId: "career-matrix",
  },
  {
    id: "close",
    roman: "VI",
    title: "Closing Pages",
    hook: "A personal word, then the final page—legacy written in light.",
    anchorId: "tribute",
  },
];
