import { css } from "@/styled-system/css";

export const DataField = ({
  label,
  value,
  isAlert,
}: {
  label: string;
  value: string;
  isAlert?: boolean;
}) => {
  return (
    <div
      className={css({
        bg: "rgba(255, 255, 255, 0.02)",
        p: "3",
        border: "1px solid",
        borderColor: "white/5",
      })}
    >
      <p
        className={css({
          fontSize: "9px",
          color: "white/40",
          textTransform: "uppercase",
          mb: "1",
        })}
      >
        {label}
      </p>
      <p
        className={css({
          fontSize: "sm",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: isAlert ? "dip.red" : "white",
        })}
      >
        {value}
      </p>
    </div>
  );
};
