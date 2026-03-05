import { css } from "@/styled-system/css";
import { flex, stack } from "@/styled-system/patterns";
import { EnrichedEntityType } from "@/types/entity.types";
import EntityStatus from "../entitiy-status/entity-status";
import { defaultClassifiedName } from "@/app/constants/entity.constants";

export default function GridItem({ entity }: { entity: EnrichedEntityType }) {
  const { locked, name, id, imageUrl, category, xp, played } = entity;

  return (
    <a href={`/chat/${id}`} className={css({ display: "block", w: "full" })}>
      <div
        className={stack({
          gap: "0",
          w: "full",
          bg: "dip.gray_card",
          border: "1px solid",
          borderColor: "white/10",
          p: "3",
          fontFamily: "mono",
          transition: "all 0.3s ease",
          _hover: {
            borderColor: locked ? "dip.red/40" : "dip.green/40",
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
          },
        })}
      >
        <div
          className={css({
            position: "relative",
            w: "full",
            aspectRatio: "3/4",
            bg: "black",
            overflow: "hidden",
            mb: "3",
            border: "1px solid",
            borderColor: "white/5",
          })}
        >
          <img
            src={locked ? `/categories/${category}.webp` : imageUrl || ""}
            alt={name.en}
            className={css({
              w: "full",
              h: "full",
              objectFit: "cover",
              filter: locked ? "grayscale(1) brightness(0.4)" : "none",
              transition: "all 0.5s ease",
            })}
          />
          <div
            className={css({
              position: "absolute",
              inset: 0,
              bg: "repeating-linear-gradient(0deg, rgba(255,0,0,0.03) 0px, transparent 2px)",
              pointerEvents: "none",
            })}
          />
        </div>
        <div className={stack({ gap: "3" })}>
          <EntityStatus locked={locked} xp={xp} played={played} />

          <div
            className={flex({ justify: "space-between", align: "flex-end" })}
          >
            <div className={stack({ gap: "0" })}>
              <span
                className={css({
                  fontSize: "9px",
                  color: locked ? "dip.red" : "dip.green",
                  textTransform: "uppercase",
                  mb: "0.5",
                })}
              >
                {locked ? "● Encrypted" : "● Decrypted"}
              </span>
              <h3
                className={css({
                  fontSize: "md",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: locked ? "white/40" : "white",
                  lineHeight: "1",
                })}
              >
                {locked ? defaultClassifiedName.ru : name.ru}
              </h3>
            </div>
            <span
              className={css({
                fontSize: "10px",
                color: "white/30",
                letterSpacing: "0.1em",
              })}
            >
              REF_NO: #{id.toString().padStart(4, "0")}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
