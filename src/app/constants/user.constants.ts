export const UserRank = {
  NEWBIE: "Newbie",
  INFORMANT: "Informant",
  SLEEPER_AGENT: "Sleeper Agent",
  FIELD_OPERATIVE: "Field Operative",
  SPECIAL_INVESTIGATOR: "Special Investigator",
  INTELLIGENCE_ANALYST: "Intelligence Analyst",
  COUNTER_INTELLIGENCE: "Counter-Intelligence",
  HEAD_OF_INTELLIGENCE: "Head of Intelligence",
} as const;

export type UserRankType = (typeof UserRank)[keyof typeof UserRank];

export const RANK_LEVELS: Record<UserRankType, number> = {
  [UserRank.NEWBIE]: 0,
  [UserRank.INFORMANT]: 1,
  [UserRank.SLEEPER_AGENT]: 2,
  [UserRank.FIELD_OPERATIVE]: 3,
  [UserRank.SPECIAL_INVESTIGATOR]: 4,
  [UserRank.INTELLIGENCE_ANALYST]: 5,
  [UserRank.COUNTER_INTELLIGENCE]: 6,
  [UserRank.HEAD_OF_INTELLIGENCE]: 7,
};
