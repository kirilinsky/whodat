import { getCategoryLabel } from "@/services/get-category-label";
import { css } from "@/styled-system/css";
import { stack, flex } from "@/styled-system/patterns";
import { EnrichedEntityType } from "@/types/entity.types";
import { DataField } from "../data-field/data-field";

interface ChatAsideProps {
  entity: EnrichedEntityType;
  locale?: "ru" | "en" | "de";
}
/* TODO locales */
export default function Aside({ entity, locale = "ru" }: ChatAsideProps) {
  const { locked, played, imageUrl, name, category } = entity;

  return (
    <aside
      className={stack({
        gap: "5",
        w: "full",
        color: "white",
        fontFamily: "mono",
        py: "3",
        maxH: "full",
        overflowY: "auto",
        overflowX: "hidden",
      })}
    >
      <div
        className={css({
          position: "relative",
          border: "1px solid",
          borderColor: locked ? "white/5" : "white/15",
          p: "4",
          bg: "rgba(10, 5, 5, 0.6)",
          transition: "all 0.3s ease",
        })}
      >
        <div
          className={css({
            aspectRatio: "3/4",
            bg: "black",
            mb: "4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            border: "1px solid",
            borderColor: "white/10",
          })}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Subject Profile"
              className={css({
                w: "full",
                h: "full",
                objectFit: "cover",
                filter: locked
                  ? "grayscale(1) brightness(0.3) blur(4px)"
                  : "none",
                opacity: locked ? 0.5 : 1,
              })}
            />
          ) : (
            <div className={css({ fontSize: "4xl", opacity: 0.2 })}>👤</div>
          )}
          <div
            className={css({
              position: "absolute",
              inset: 0,
              bg: "repeating-linear-gradient(0deg, rgba(255,0,0,0.05) 0px, rgba(255,0,0,0.05) 1px, transparent 2px, transparent 3px)",
              pointerEvents: "none",
            })}
          />
        </div>
        <div className={stack({ gap: "1" })}>
          <div className={flex({ justify: "space-between", align: "center" })}>
            <span className={css({ color: "dip.red", fontSize: "10px" })}>
              ID: {entity.id}
            </span>
            {played && !locked && (
              <span
                className={css({
                  fontSize: "9px",
                  px: "2",
                  py: 1,
                  bg: "dip.red_dark",
                  color: "white",
                })}
              >
                ACTIVE SESSION
              </span>
            )}
          </div>
          <h3
            className={css({
              fontSize: "xl",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: locked ? "white/40" : "white",
            })}
          >
            {name[locale]}
          </h3>
        </div>
      </div>

      <div className={stack({ gap: "1" })}>
        <DataField
          label="Current Status"
          value={locked ? "Unknown" : "Identified"}
          isAlert={locked}
        />
        <DataField
          label="Threat Category"
          value={getCategoryLabel(category, locale)}
        />
      </div>
    </aside>
  );
}
