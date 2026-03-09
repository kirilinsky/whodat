"use client";

import { css } from "@/styled-system/css";
import { flex, hstack } from "@/styled-system/patterns";
import { t } from "@/services/get-translation";
import { Locale } from "@/services/get-server-locale";

interface ProgressProps {
  current: number;
  total?: number;
  locale: Locale;
}

export default function Progress({
  current,
  total = 7,
  locale,
}: ProgressProps) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        justifyContent: { base: "center", md: "flex-start" },
        w: "full",
        mb: { base: "0", md: "4" },
      })}
    >
      <div
        className={flex({
          justify: "space-between",
          align: "flex-end",
          mb: "2",
        })}
      >
        <span
          className={css({
            fontSize: "10px",
            color: "white/50",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          })}
        >
          {t("progress.title", locale)}
        </span>
        <span
          className={css({
            fontSize: "10px",
            fontFamily: "mono",
            color: current <= 2 ? "dip.red" : "white/70",
          })}
        >
          <strong className={css({ color: "dip.red" })}>{current}</strong>{" "}
          {t("progress.attempts_label", locale)}
        </span>
      </div>
      <div className={hstack({ gap: "2", w: "full" })}>
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i < current;
          return (
            <div
              key={i}
              className={css({
                flex: "1",
                h: "3",
                borderRadius: "sm",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                bg: isActive ? "dip.red" : "transparent",
                border: "1px solid",
                borderColor: isActive ? "dip.red" : "white/10",
                boxShadow: isActive ? "0 0 12px token(colors.dip.red)" : "none",

                _after: {
                  content: "''",
                  position: "absolute",
                  inset: "0",
                  bg: !isActive ? "white/5" : "transparent",
                },
              })}
            />
          );
        })}
      </div>
    </div>
  );
}
