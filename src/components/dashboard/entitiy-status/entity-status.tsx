"use client";

import { css } from "@/styled-system/css";
import { t } from "@/services/get-translation";
import { Locale } from "@/services/get-server-locale";

interface EntityStatusProps {
  locked: boolean;
  played: boolean;
  xp: number;
  locale: Locale;
}

const EntityStatus = ({ locked, played, xp, locale }: EntityStatusProps) => {
  const inProgress = locked && played;

  const label = t("entity_status.label", locale);

  if (!locked) {
    return (
      <span
        className={css({
          fontSize: "xs",
          textTransform: "uppercase",
          color: "dip.green",
          display: "block",
          mb: "1",
          fontFamily: "mono",
        })}
      >
        {label}: {t("entity_status.revealed", locale)} | XP ({xp})
      </span>
    );
  }

  return (
    <span
      className={css({
        fontSize: "xs",
        textTransform: "uppercase",
        color: inProgress ? "dip.blue" : "dip.red",
        display: "block",
        mb: "1",
        fontFamily: "mono",
      })}
    >
      {label}:
      {inProgress
        ? t("entity_status.in_progress", locale)
        : t("entity_status.unknown", locale)}
    </span>
  );
};

export default EntityStatus;
