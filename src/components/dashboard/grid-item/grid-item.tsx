import { css } from "@/styled-system/css";
import { EnrichedEntityType } from "@/types/entity.types";
import EntityStatus from "../entitiy-status/entity-status";

export default function GridItem({ entity }: { entity: EnrichedEntityType }) {
  return (
    <a href={`/chat/${entity.id}`}>
      <div
        className={css({
          position: "relative",
          w: "full",
          bg: "dip.gray_card",
          border: "1px solid",
          borderColor: "dip.red_dark/30",
          p: "4",
          fontFamily: "mono",
        })}
      >
        <div
          className={css({
            position: "relative",
            w: "full",
            aspectRatio: "3/4",
            bg: "black",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid",
            borderColor: "white/5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: "4",
          })}
        >
          <img
            src={
              entity.locked && entity.imageUrl
                ? `/categories/${entity.category}.webp`
                : entity.imageUrl
            }
            alt={entity.name.en}
            className={css({
              w: "full",
              h: "full",
              objectFit: "cover",

              filter: entity.locked ? "brightness(0.5) blur(1px)" : "none",

              transition: "filter 0.4s ease-in-out",

              _hover: {
                filter: entity.locked ? "brightness(1) blur(0px)" : "none",
              },
            })}
          />
        </div>

        <div
          className={css({
            borderTop: "1px solid",
            borderColor: "white/5",
            pt: "3",
          })}
        >
          <div
            className={css({
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            })}
          >
            <div>
              <span
                className={css({
                  fontSize: "xs",
                  textTransform: "uppercase",
                  color: "dip.gray_light",
                  display: "block",
                  mb: "1",
                })}
              >
                SUBJECT_ID
              </span>
              <span
                className={css({
                  fontSize: "lg",
                  textTransform: "uppercase",
                  color: "white",
                  fontWeight: "bold",
                })}
              >
                {entity.id}
              </span>
            </div>

            <div className={css({ textAlign: "right" })}>
              <EntityStatus
                locked={entity.locked}
                xp={entity.xp}
                played={entity.played}
              />

              {/* TODO: handle locale */}
              <span
                className={css({
                  fontSize: "sm",
                  textTransform: "uppercase",
                  color: entity.locked ? "dip.red" : "dip.green",
                  fontWeight: "bold",
                })}
              >
                {entity.name.ru}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
