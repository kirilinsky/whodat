import { getLeaderboardData } from "../actions/leaderboard";

const Page = async () => {
  const leaders = await getLeaderboardData();
  //console.log(leaders, "leaders");

  return (
    <div>
      leaders
      <div></div>
    </div>
  );
};

export default Page;
