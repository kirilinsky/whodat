"use server";

import { db } from "@/db";
import { sessionMessages } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getChatMessages(sessionId: number) {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const messages = await db
      .select({
        id: sessionMessages.id,
        content: sessionMessages.content,
        bot: sessionMessages.bot,
        createdAt: sessionMessages.createdAt,
      })
      .from(sessionMessages)
      .where(eq(sessionMessages.sessionId, sessionId))
      .orderBy(sessionMessages.createdAt);

    return messages;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}
