import { EntityCategoryType } from "@/app/constants/entities.constants";

export type RawEntity = {
  id: number;
  category: number;
  name: {
    ru: string;
    en: string;
    de: string;
  };
  imageUrl: string;
  appearAt: string;
  createdAt: Date;
};

export type EnrichedEntityType = {
  id: number;
  category: EntityCategoryType;
  name: {
    ru: string;
    en: string;
    de: string;
  };
  imageUrl: string;
  appearAt: string | null;
  xp: number;
  locked: boolean;
  played: boolean;
};
