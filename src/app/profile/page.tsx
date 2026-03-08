import ProfileLayout from "@/components/profile/layout/layout";

import { UserType } from "@/types/user.types";
import { getProfileData } from "../actions/profile";
import { CategoryStatsType, StatsType } from "@/types/profile.types";

const Page = async () => {
  const { user, stats, categoryStats } = await getProfileData();

  return (
    <ProfileLayout
      categoryStats={categoryStats as CategoryStatsType[]}
      stats={stats as StatsType}
      user={user as UserType}
    />
  );
};

export default Page;
