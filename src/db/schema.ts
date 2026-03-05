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

export const entities = pgTable("entities", {
  id: serial("id").primaryKey(),
  category: integer("category").notNull(),
  name: jsonb("name").notNull(),
  imageUrl: text("image_url"),
  appearAt: date("appear_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
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
  attempts: integer("attempts").default(7).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const sessionMessages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id")
    .notNull()
    .references(() => sessions.id),
  bot: boolean("bot").default(false).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
