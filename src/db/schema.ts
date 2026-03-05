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
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").notNull().unique(),
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

export const gameSessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.clerkId),
  entityId: integer("entity_id")
    .notNull()
    .references(() => entities.id),
  active: boolean("active").default(true).notNull(),
  success: boolean("success").default(false).notNull(),
  xp: integer("xp").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessionMessages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => gameSessions.id),
  bot: boolean("bot").default(false).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
