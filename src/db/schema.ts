import { defaultRank } from "@/app/constants/user.constants";
import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  email: text("email").notNull(),
  username: varchar("username", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  xp: integer("xp").default(0),
  rank: text("rank").default(defaultRank),
});
