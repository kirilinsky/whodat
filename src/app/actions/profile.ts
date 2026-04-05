"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, sessions, entities, sessionMessages } from "@/db/schema";
import { eq, sql, sum, count, and } from "drizzle-orm";

export async function getProfileData() {
  const { userId: clerkId } = await auth();
  const clerkUser = await currentUser();

  if (!clerkId || !clerkUser) {
    throw new Error("Unauthorized");
  }

  let [dbUser, sessionStats, totalMessages] = await Promise.all([
    db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    }),
    db
      .select({
        completed: count(sql`CASE WHEN ${sessions.active} = false THEN 1 END`),
        active: count(sql`CASE WHEN ${sessions.active} = true THEN 1 END`),
      })
      .from(sessions)
      .where(eq(sessions.userId, clerkId))
      .then((res) => res[0]),
    db
      .select({ value: count(sessionMessages.id) })
      .from(sessionMessages)
      .innerJoin(sessions, eq(sessionMessages.sessionId, sessions.id))
      .where(eq(sessions.userId, clerkId))
      .then((res) => res[0]?.value ?? 0),
  ]);
  const categoryStats = await db
    .select({
      category: entities.category,
      count: count(sessions.id),
    })
    .from(sessions)
    .innerJoin(entities, eq(sessions.entityId, entities.id))
    .where(
      and(
        eq(sessions.userId, clerkId),
        eq(sessions.success, true),
        eq(sessions.active, false),
      ),
    )
    .groupBy(entities.category);

  if (!dbUser) {
    const [newUser] = await db
      .insert(users)
      .values({
        clerkId,
        email: clerkUser.emailAddresses[0].emailAddress,
        username:
          clerkUser.username || clerkUser.firstName || "Unknown Operator",
        xp: 0,
        rank: 0,
      })
      .returning();

    dbUser = newUser;
  }

  return {
    user: dbUser,
    stats: {
      totalMessages: Number(totalMessages || 0),
      completed: sessionStats?.completed || 0,
      active: sessionStats?.active || 0,
    },
    categoryStats,
  };
}
