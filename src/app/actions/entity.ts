import { db } from "@/db";
import { entities, sessions } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import {
  defaultClassifiedName,
  EntityCategoryType,
} from "@/app/constants/entities.constants";
import { EnrichedEntityType } from "@/types/entity.types";

export async function getEntitiesByCategory(
  category: EntityCategoryType,
): Promise<EnrichedEntityType[]> {
  const { userId } = await auth();
  if (!userId) return [];

  try {
    const results = await db
      .select({
        id: entities.id,
        category: entities.category,
        appearAt: entities.appearAt,
        rawName: entities.name,
        rawImageUrl: entities.imageUrl,
        sessionActive: sessions.active,
        sessionSuccess: sessions.success,
        earnedXp: sessions.xp,
      })
      .from(entities)
      .leftJoin(
        sessions,
        and(eq(sessions.entityId, entities.id), eq(sessions.userId, userId)),
      )
      .where(eq(entities.category, category))
      .orderBy(desc(entities.appearAt));

    return results.map((row): EnrichedEntityType => {
      const isRevealed = row.sessionSuccess === true;
      const isStarted = row.sessionActive === true;

      const realName = row.rawName as EnrichedEntityType["name"];

      return {
        id: row.id,
        category: row.category as EntityCategoryType,
        appearAt: row.appearAt,
        name: isRevealed ? realName : defaultClassifiedName,
        imageUrl: isRevealed ? row.rawImageUrl : null,
        xp: row.earnedXp || 0,
        locked: !isRevealed,
        played: isStarted,
      };
    });
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
