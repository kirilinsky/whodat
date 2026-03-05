import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

export default function ChatLayout() {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", lg: "380px 1fr" },
        h: { base: "auto", lg: "calc(100vh - 94px)" },
        w: "full",
        bg: "black",
        gap: "0",
        overflow: "hidden",
      })}
    >
      <aside
        className={css({
          borderRight: { lg: "1px solid" },
          borderBottom: { base: "1px solid", lg: "none" },
          borderColor: "white/10",
          p: "6",
          overflowY: "auto",
          bg: "rgba(10, 5, 5, 1)",
        })}
      >
        Dossier
      </aside>

      <main
        className={flex({
          direction: "column",
          h: "full",
          minH: 0,
          position: "relative",
          bg: "rgba(15, 7, 7, 1)",
        })}
      >
        <div
          className={css({
            flex: "1",
            overflowY: "auto",
            p: { base: "4", lg: "8" },
          })}
        >
         chat...
        </div>

        <footer
          className={css({
            p: "6",
            borderTop: "1px solid",
            borderColor: "white/10",
            bg: "black",
          })}
        >
          Input area
        </footer>
      </main>
    </div>
  );
}
