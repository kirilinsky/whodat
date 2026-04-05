"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { grid, stack, flex } from "@/styled-system/patterns";
import { StatsType } from "@/types/profile.types";
import { Locale } from "@/services/get-server-locale";
import { t } from "@/services/get-translation";

export default function Statistics({
  stats,
  locale,
}: {
  stats: StatsType;
  locale: Locale;
}) {
  const cardStyle = css({
    bg: "rgba(20, 20, 20, 0.8)",
    border: "1px solid",
    borderColor: "white/10",
    borderRadius: "xl",
    p: "6",
  });

  const labelStyle = css({
    fontSize: "10px",
    color: "dip.gray",
    textTransform: "uppercase",
    letterSpacing: "widest",
    mb: "1",
    fontFamily: "mono",
  });

  const numberStyle = css({
    fontSize: "2xl",
    fontFamily: "mono",
    fontWeight: "bold",
    color: "white",
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={cardStyle}
    >
      <div className={flex({ align: "center", gap: "2", mb: "6" })}>
        <div
          className={css({
            w: "2",
            h: "2",
            bg: "dip.red",
            transform: "rotate(45deg)",
          })}
        />
        <h3
          className={labelStyle}
          style={{ color: "white", fontSize: "12px", marginBottom: 0 }}
        >
          {t("mission_stats.title", locale)}
        </h3>
      </div>

      <div className={grid({ columns: { base: 1, md: 3 }, gap: "6" })}>
        {/* Total Messages */}
        <div className={stack({ gap: "0" })}>
          <span className={labelStyle}>
            {t("mission_stats.total_messages", locale)}
          </span>
          <span className={numberStyle}>{stats.totalMessages || 0}</span>
          <div className={css({ w: "full", h: "1", bg: "white/5", mt: "2" })}>
            <div className={css({ h: "full", bg: "dip.red" })} />
          </div>
        </div>

        {/* Completed Archives */}
        <div className={stack({ gap: "0" })}>
          <span className={labelStyle}>
            {t("mission_stats.completed_archives", locale)}
          </span>
          <span
            className={numberStyle}
            style={{ color: "var(--colors-dip-green)" }}
          >
            {stats.completed}
          </span>
          <div className={css({ w: "full", h: "1", bg: "white/5", mt: "2" })}>
            <div className={css({ h: "full", bg: "dip.green/40" })} />
          </div>
        </div>

        {/* Active Sessions */}
        <div className={stack({ gap: "0" })}>
          <span className={labelStyle}>
            {t("mission_stats.active_sessions", locale)}
          </span>
          <span
            className={numberStyle}
            style={{ color: "var(--colors-dip-gray)" }}
          >
            {stats.active}
          </span>
          <div className={css({ w: "full", h: "1", bg: "white/5", mt: "2" })}>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={css({ h: "full", bg: "dip.gray" })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
