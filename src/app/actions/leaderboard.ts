// src/app/actions/leaderboard.ts
"use server";

import { db } from "@/db";
import { users, sessions } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { createClerkClient } from "@clerk/nextjs/server";

export async function getLeaderboardData() {
  const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

  const topUsers = await db
    .select({
      clerkId: users.clerkId,
      username: users.username,
      xp: users.xp,
      rank: users.rank,

      solvedCount: db.$count(
        sessions,
        sql`${sessions.userId} = ${users.clerkId} AND ${sessions.success} = true`,
      ),
    })
    .from(users)
    .orderBy(desc(users.xp))
    .limit(50);

  const userIds = topUsers.map((u) => u.clerkId);

  const { data: clerkUsers } = await clerk.users.getUserList({
    userId: userIds,
  });

  const leaderboard = topUsers.map((dbUser) => {
    const clerkUser = clerkUsers.find((cu) => cu.id === dbUser.clerkId);
    return {
      ...dbUser,
      avatar: clerkUser?.imageUrl || "/default.png",
    };
  });

  return leaderboard;
}
