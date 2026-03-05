import { css } from "@/styled-system/css";

const EntityStatus = ({
  locked,
  played,
  xp,
}: {
  locked: boolean;
  played: boolean;
  xp: number;
}) => {
  /* TODO add locale */
  const inProgress = locked && played;
  if (!locked) {
    return (
      <span
        className={css({
          fontSize: "xs",
          textTransform: "uppercase",
          color: "dip.green",
          display: "block",
          mb: "1",
        })}
      >
        STATUS: REVEALED | XP ({xp})
      </span>
    );
  }
  return inProgress ? (
    <span
      className={css({
        fontSize: "xs",
        textTransform: "uppercase",
        color: "dip.blue",
        display: "block",
        mb: "1",
      })}
    >
      STATUS: IN_PROGRESS
    </span>
  ) : (
    <span
      className={css({
        fontSize: "xs",
        textTransform: "uppercase",
        color: "dip.red",
        display: "block",
        mb: "1",
      })}
    >
      STATUS: UNKNOWN
    </span>
  );
};

export default EntityStatus;
