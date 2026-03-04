import { EntityCategory } from "@/app/constants/entities.constants";
import CategoryTabs from "@/components/dashboard/tabs/tabs";
import { css } from "@/styled-system/css";

export default async function DashboardScreen({
  activeCategory,
}: {
  activeCategory: string;
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
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: { base: "1", sm: "2", lg: "3" },
            gap: "4",
          })}
        >
          <div
            className={css({
              border: "1px solid",
              borderColor: "white/5",
              bg: "white/5",
              p: "10",
              textAlign: "center",
              fontFamily: "mono",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "widest",
              color: "dip.gray",
            })}
          >
            Scanning for intel in {activeCategory.replace("_", " ")}...
          </div>
        </div>
      </section>
    </main>
  );
}
