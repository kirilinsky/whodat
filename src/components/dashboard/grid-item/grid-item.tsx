import { css } from "@/styled-system/css";
import { EntityType } from "@/types/entities.types";

export default function GridItem({ entity }: { entity: EntityType }) {
  return (
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
          aspectRatio: "5/3",
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
        {entity.imageUrl ? (
          <img
            src={entity.imageUrl}
            alt={entity.name.en}
            className={css({ w: "full", h: "full", objectFit: "cover" })}
          />
        ) : (
          <div className={css({ color: "#1a1a1a", fontSize: "60px" })}>👤</div>
        )}
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
            <span
              className={css({
                fontSize: "xs",
                textTransform: "uppercase",
                color: "dip.gray_light",
                display: "block",
                mb: "1",
              })}
            >
              CURRENT_STATE
            </span>
            <span
              className={css({
                fontSize: "sm",
                textTransform: "uppercase",
                color: "dip.red",
                fontWeight: "bold",
              })}
            >
              {/* TODO: handle status for user UNKNOWN/entity name and locale */}
              STATUS: UNKNOWN/({entity.name.ru})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
