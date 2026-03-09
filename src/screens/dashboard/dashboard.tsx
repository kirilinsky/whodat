import EntitiesGrid from "@/components/dashboard/grid/grid";
import CategoryTabs from "@/components/dashboard/tabs/tabs";
import { css } from "@/styled-system/css";
import { EnrichedEntityType } from "@/types/entity.types";
import { UserType } from "@/types/user.types";

export default async function DashboardScreen({
  activeCategory,
  entities,
  user,
}: {
  activeCategory: number;
  entities: EnrichedEntityType[];
  user: UserType;
}) {
  return (
    <main
      className={css({
        minH: "screen",
        bg: "dip.bg",
        pt: "6",
        color: "white",
      })}
    >
      <CategoryTabs user={user} active={activeCategory} /> 
      <EntitiesGrid entities={entities} />
    </main>
  );
}
