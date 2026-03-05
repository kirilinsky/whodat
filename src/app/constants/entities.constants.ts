export const EntityCategory = {
  ANCIENT: "ancient",
  MIDDLE_AGES: "middle_ages",
  RENAISSANCE: "renaissance",
  INDUSTRIAL: "industrial",
  MODERN: "modern",
  CONTEMPORARY: "contemporary",
  CINEMA: "cinema",
  BOOKS: "books",
} as const;

export type EntityCategoryType =
  (typeof EntityCategory)[keyof typeof EntityCategory];

export const defaultClassifiedName = {
  ru: "ЛИЧНОСТЬ ЗАСЕКРЕЧЕНА",
  en: "CLASSIFIED",
  de: "GEHEIM",
};
