import {
  Target,
  Shield,
  Zap,
  Crosshair,
  ShieldAlert,
  Crown,
  Star,
  Award,
} from "lucide-react";

export const RANK_ICONS: Record<number, any> = {
  0: Target,
  1: Zap,
  2: Shield,
  3: Crosshair,
  4: ShieldAlert,
  5: Award,
  6: Crown,
  7: Star,
};

export const RankLabels = {
  0: { ru: "Новичок", en: "Newbie", de: "Neuling" },
  1: { ru: "Информатор", en: "Informant", de: "Informant" },
  2: { ru: "Спящий агент", en: "Sleeper Agent", de: "Schläfer" },
  3: { ru: "Оперативник", en: "Field Operative", de: "Außendienstler" },
  4: { ru: "Спецрасследователь", en: "Special Investigator", de: "Ermittler" },
  5: { ru: "Аналитик разведки", en: "Intelligence Analyst", de: "Analyst" },
  6: { ru: "Контрразведка", en: "Counter-Intelligence", de: "Abwehr" },
  7: {
    ru: "Глава разведки",
    en: "Head of Intelligence",
    de: "Geheimdienstchef",
  },
} as const;

export type RankLevel = keyof typeof RankLabels;

export type UserRankName = (typeof RankLabels)[RankLevel]["en"];

export const RANK_THRESHOLDS: Record<RankLevel, number> = {
  0: 0,
  1: 70,
  2: 150,
  3: 250,
  4: 400,
  5: 550,
  6: 700,
  7: 100,
};
