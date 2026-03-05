"use server";

import { db } from "@/db";
import { sessions, sessionMessages, entities } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import { RawEntity } from "@/types/entity.types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function sendMessage(sessionId: number, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const sessionData = await db
    .select()
    .from(sessions)
    .innerJoin(entities, eq(sessions.entityId, entities.id))
    .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)))
    .limit(1);

  const data = sessionData[0];
  if (!data || !data.sessions.active || data.sessions.attempts <= 0) {
    return { error: "No attempts left" };
  }
  const entity = data.entities as RawEntity;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
        You are ${entity.name.en}. 
        STRICT RULES:
        1. Answer the user's questions directly based on your historical biography, don't overplay.
        2. Keep the tone slightly mysterious but ensure the information is factual and clear.
        3. Do not use overly flowery or vague metaphors.
        4. If asked what you are famous for, list your key historical contributions or notorious acts clearly and short.
        5. Maximum response length: 26 words.
        6. Language: Use the same language as the user's message.
        7. Don't reveal yourself easily, only if user spell you name
      `,
        },
        { role: "user", content },
      ],
      max_tokens: 50,
    });
    const botResponse = completion.choices[0].message.content || "...";
    await db.transaction(async (tx) => {
      await tx
        .update(sessions)
        .set({ attempts: sql`${sessions.attempts} - 1` })
        .where(eq(sessions.id, sessionId));

      await tx.insert(sessionMessages).values({
        sessionId,
        content,
        bot: false,
      });

      await tx.insert(sessionMessages).values({
        sessionId,
        content: botResponse,
        bot: true,
      });
    });

    revalidatePath(`/chat/${data.entities.id}`);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "AI communication failed" };
  }
}
