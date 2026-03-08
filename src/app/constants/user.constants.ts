export const RANK_LEVELS = {
  0: "Newbie",
  1: "Informant",
  2: "Sleeper Agent",
  3: "Field Operative",
  4: "Special Investigator",
  5: "Intelligence Analyst",
  6: "Counter-Intelligence",
  7: "Head of Intelligence",
} as const;

export type RankLevel = keyof typeof RANK_LEVELS;

export type UserRankName = (typeof RANK_LEVELS)[RankLevel];

export const RANK_THRESHOLDS: Record<RankLevel, number> = {
  0: 0,
  1: 75,
  2: 200,
  3: 350,
  4: 500,
  5: 750,
  6: 1000,
  7: 2000,
};
