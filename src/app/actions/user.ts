"use server";

import { cache } from "react";
import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { UserType } from "@/types/user.types";

export const syncUser = cache(async () => {
  {
    try {
      const user = await currentUser();

      if (!user) {
        return { error: "User not authenticated" };
      }

      const existingUser = await db.query.users.findFirst({
        where: eq(users.clerkId, user.id),
      });

      if (!existingUser) {
        const [newUser] = await db
          .insert(users)
          .values({
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            username: user.username || user.firstName,
          })
          .returning();

        return { success: "Agent Created", user: newUser as UserType };
      }

      return { success: "Agent Exists", user: existingUser as UserType };
    } catch (error) {
      console.error("--- SYNC USER ---", error);
      return { error: "Failed to sync with archive" };
    }
  }
});
