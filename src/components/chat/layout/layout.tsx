import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import Aside from "../aside/aside";
import { EnrichedEntityType } from "@/types/entity.types";
import Progress from "../progress/progress";
import Input from "../input/input";

export default function ChatLayout({
  entity,
}: {
  entity: EnrichedEntityType | null;
}) {
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
      {entity && <Aside entity={entity} />}

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
          <Progress current={6} />
          <Input />
        </footer>
      </main>
    </div>
  );
}
