import { RankLabels, RankLevel } from "@/app/constants/user.constants";

export const getRankLabel = (
  rank: number,
  locale: "ru" | "en" | "de" = "ru",
): string => {
  const labelObj = RankLabels[rank as RankLevel];

  if (!labelObj) return `Classified (${rank})`;

  return labelObj[locale];
};
