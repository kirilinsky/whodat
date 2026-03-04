import { UserRankType } from "@/app/constants/user.constants";

export type UserType = {
  id: string;
  clerkId: string;
  email: string;
  username: string | null;
  createdAt: Date | null;
  xp: number;
  rank: UserRankType;
};
