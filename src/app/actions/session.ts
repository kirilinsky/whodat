import { db } from "@/db";
import { sessions } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getOrCreateSession(entityId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existingSession = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.userId, userId),
      eq(sessions.entityId, entityId),
      eq(sessions.active, true),
    ),
  });

  if (existingSession) {
    return existingSession;
  }

  const [newSession] = await db
    .insert(sessions)
    .values({
      userId,
      entityId,
      active: true,
    })
    .returning();

  return newSession;
}
