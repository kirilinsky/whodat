import EntitiesGrid from "@/components/dashboard/grid/grid";
import CategoryTabs from "@/components/dashboard/tabs/tabs";
import { css } from "@/styled-system/css";
import { EnrichedEntityType } from "@/types/entity.types";

export default async function DashboardScreen({
  activeCategory,
  entities,
}: {
  activeCategory: string;
  entities: EnrichedEntityType[];
}) {
  return (
    <main
      className={css({
        minH: "screen",
        bg: "dip.bg",
        p: "8",
        color: "white",
      })}
    >
      <header className={css({ mb: "10" })}>
        <h1
          className={css({
            fontFamily: "mono",
            fontSize: "xs",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "dip.gray",
          })}
        >
          Terminal / Intelligence /{" "}
          <span className={css({ color: "dip.red" })}>Archives</span>
        </h1>
      </header>

      <CategoryTabs active={activeCategory} />

      <section className={css({ mt: "12" })}>
        <EntitiesGrid entities={entities} />
      </section>
    </main>
  );
}
