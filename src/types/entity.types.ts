import { EntityCategoryType } from "@/app/constants/entities.constants";

export type EntityType = {
  id: number;
  category: EntityCategoryType;
  name: {
    en: string;
    ru: string;
    de: string;
  };
  imageUrl: string | null;
  appearAt: string | null;
  createdAt: Date | null;
};
