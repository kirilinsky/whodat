import EntitiesGrid from "@/components/dashboard/grid/grid";
import CategoryTabs from "@/components/dashboard/tabs/tabs";
import { css } from "@/styled-system/css";
import { EnrichedEntityType } from "@/types/entity.types";

export default async function DashboardScreen({
  activeCategory,
  entities,
}: {
  activeCategory: number;
  entities: EnrichedEntityType[];
}) {
  return (
    <main
      className={css({
        minH: "screen",
        bg: "dip.bg",
        pt: "8",
        color: "white",
      })}
    >
      <CategoryTabs active={activeCategory} />

      <EntitiesGrid entities={entities} />
    </main>
  );
}
