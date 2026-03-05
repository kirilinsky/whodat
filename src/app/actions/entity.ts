import { db } from "@/db";
import { entities, sessions } from "@/db/schema";
import { and, eq, desc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import {
  defaultClassifiedName,
  EntityCategoryType,
} from "@/app/constants/entity.constants";
import { EnrichedEntityType } from "@/types/entity.types";

export async function getEntitiesByCategory(
  category: number,
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
        imageUrl: isRevealed
          ? (row.rawImageUrl as string)
          : `/categories/${row.category}.webp`,
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

export async function getEnrichedEntityById(
  entityId: number,
): Promise<EnrichedEntityType | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const result = await db
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
    .where(eq(entities.id, entityId))
    .limit(1);

  if (result.length === 0) return null;

  const row = result[0];
  const isRevealed = row.sessionSuccess === true;

  return {
    id: row.id,
    category: row.category as EntityCategoryType,
    appearAt: row.appearAt,
    name: isRevealed ? (row.rawName as any) : defaultClassifiedName,
    imageUrl: isRevealed
      ? (row.rawImageUrl as string)
      : `/categories/${row.category}.webp`,
    xp: row.earnedXp || 0,
    locked: !isRevealed,
    played: row.sessionActive === true,
  };
}
