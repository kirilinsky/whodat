import { css } from "@/styled-system/css";
import { flex, stack } from "@/styled-system/patterns";
import { EnrichedEntityType } from "@/types/entity.types";
import Progress from "../progress/progress";
import { getCategoryLabel } from "@/services/get-category-label";

export default function MobileInfo({
  entity,
  attempts,
}: {
  entity: EnrichedEntityType;
  attempts: number;
}) {
  const { name, imageUrl, category, locked } = entity;

  return (
    <div
      className={css({
        display: { base: "flex", md: "none" },
        justifyContent: "space-between",
        gap: { base: "5", md: "3" },
        p: "3",
        bg: "dip.gray_card",
        borderBottom: "1px solid",
        borderColor: "dip.red/20",
        w: "full",
        fontFamily: "mono",
      })}
    >
      <div className={flex({ align: "center", gap: "4" })}>
        <div
          className={css({
            w: "16",
            h: "16",
            flexShrink: 0,
            border: "1px solid",
            borderColor: "dip.red/40",
            p: "0.5",
            bg: "black",
          })}
        >
          <img
            src={locked ? `/categories/${category}.webp` : imageUrl}
            className={css({
              w: "full",
              h: "full",
              objectFit: "cover",
              filter: locked ? "grayscale(1) brightness(0.6)" : "none",
            })}
          />
        </div>

        <div className={stack({ gap: "0.5" })}>
          <span
            className={css({
              fontSize: "10px",
              color: "dip.red",
              textTransform: "uppercase",
              letterSpacing: "widest",
            })}
          >
            {getCategoryLabel(category, "ru")}
          </span>
          <h2
            className={css({
              fontSize: "md",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
            })}
          >
            {locked ? "CLASSIFIED" : name.ru}
          </h2>
        </div>
      </div>
      <Progress current={attempts} />
    </div>
  );
}
