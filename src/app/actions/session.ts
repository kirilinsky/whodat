import { db } from "@/db";
import { sessionMessages, sessions } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { WELCOME_MESSAGES } from "../constants/message.constants";

export async function getOrCreateSession(entityId: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existingSession = await db.query.sessions.findFirst({
    where: and(eq(sessions.userId, userId), eq(sessions.entityId, entityId)),
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
      attempts: 7,
    })
    .returning();
  const randomIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
  const greeting = WELCOME_MESSAGES[randomIndex];

  await db.insert(sessionMessages).values({
    sessionId: newSession.id,
    content: greeting.ru,
    bot: true,
  });

  return newSession;
}
