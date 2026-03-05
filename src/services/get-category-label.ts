import {
  EntityCategoryLabels,
  EntityCategoryType,
} from "@/app/constants/entity.constants";

export const getCategoryLabel = (
  categoryId: number,
  locale: "ru" | "en" | "de" = "ru",
): string => {
  const labelObj = EntityCategoryLabels[categoryId as EntityCategoryType];

  if (!labelObj) return `Unknown (${categoryId})`;

  return labelObj[locale];
};
