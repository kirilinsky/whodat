import { TableItem } from "@/components/board/table-item/table-item";
import { getLeaderboardData } from "../actions/leaderboard";

const Page = async () => {
  const leaders = await getLeaderboardData();
  const x = leaders[1];
  return (
    <div>
      leaders
      <div>
        <TableItem
          isFriend={false}
          xpProgress={x.xp || 0}
          avatar={x.avatar}
          username={x.username || "noname"}
          rank={x.rank}
        />
      </div>
    </div>
  );
};

export default Page;
