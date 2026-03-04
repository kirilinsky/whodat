import { EntityCategory } from "@/app/constants/entities.constants";
import { UserRank } from "@/app/constants/user.constants";
import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  integer,
  serial,
  pgEnum,
  date,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: text("email").notNull(),
  username: varchar("username", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  xp: integer("xp").default(0),
  rank: text("rank").default(UserRank.NEWBIE),
});

const categories = Object.values(EntityCategory) as [string, ...string[]];
export const entityCategoryEnum = pgEnum("entity_category", categories);
export const entities = pgTable("entities", {
  id: serial("id").primaryKey(),
  category: entityCategoryEnum("category").notNull(),
  name: jsonb("name").notNull(),
  imageUrl: text("image_url"),
  appearAt: date("appear_at").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
