export const EntityCategory = {
  ANCIENT: 0,
  MIDDLE_AGES: 1,
  RENAISSANCE: 2,
  INDUSTRIAL: 3,
  MODERN: 4,
  CONTEMPORARY: 5,
  CINEMA: 6,
  BOOKS: 7,
} as const;

export type EntityCategoryType =
  (typeof EntityCategory)[keyof typeof EntityCategory];

export const EntityCategoryLabels: Record<
  EntityCategoryType,
  { ru: string; en: string; de: string }
> = {
  [EntityCategory.ANCIENT]: {
    ru: "Античность",
    en: "Ancient World",
    de: "Antike",
  },
  [EntityCategory.MIDDLE_AGES]: {
    ru: "Средневековье",
    en: "Middle Ages",
    de: "Mittelalter",
  },
  [EntityCategory.RENAISSANCE]: {
    ru: "Возрождение",
    en: "Renaissance",
    de: "Renaissance",
  },
  [EntityCategory.INDUSTRIAL]: {
    ru: "Индустриальная эра",
    en: "Industrial Era",
    de: "Industriezeitalter",
  },
  [EntityCategory.MODERN]: {
    ru: "Новое время",
    en: "Modern Era",
    de: "Neuzeit",
  },
  [EntityCategory.CONTEMPORARY]: {
    ru: "Новейшее время",
    en: "Contemporary",
    de: "Zeitgeschichte",
  },
  [EntityCategory.CINEMA]: {
    ru: "Кино",
    en: "Cinema",
    de: "Kino",
  },
  [EntityCategory.BOOKS]: {
    ru: "Книги",
    en: "Literature",
    de: "Literatur",
  },
};

export const defaultClassifiedName = {
  ru: "СЕКРЕТНО",
  en: "CLASSIFIED",
  de: "GEHEIM",
};
