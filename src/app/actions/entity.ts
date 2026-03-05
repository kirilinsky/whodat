import { db } from "@/db";
import { entities } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EntityCategoryType } from "@/app/constants/entities.constants";
import { EntityType } from "@/types/entity.types";

export async function getEntitiesByCategory(
  category: EntityCategoryType,
): Promise<EntityType[]> {
  try {
    const results = await db.query.entities.findMany({
      where: eq(entities.category, category),
      orderBy: (entities, { desc }) => [desc(entities.appearAt)],
    });

    return results as EntityType[];
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}
