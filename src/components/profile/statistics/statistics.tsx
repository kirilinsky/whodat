"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { grid, stack, flex } from "@/styled-system/patterns";
import { StatsType } from "@/types/profile.types";

export default function Statistics({ stats }: { stats: StatsType }) {
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
          Mission Statistics
        </h3>
      </div>

      <div className={grid({ columns: { base: 1, md: 3 }, gap: "6" })}>
        <div className={stack({ gap: "0" })}>
          <span className={labelStyle}>Total Messages Sent</span>
          <span className={numberStyle}>{stats.totalMessages || 0}</span>
          <div className={css({ w: "full", h: "1", bg: "white/5", mt: "2" })}>
            <div className={css({ w: "60%", h: "full", bg: "dip.red" })} />
          </div>
        </div>

        <div className={stack({ gap: "0" })}>
          <span className={labelStyle}>Completed Archives</span>
          <span
            className={numberStyle}
            style={{ color: "var(--colors-dip-green)" }}
          >
            {stats.completed}
          </span>
          <div className={css({ w: "full", h: "1", bg: "white/5", mt: "2" })}>
            <div
              className={css({ w: "100%", h: "full", bg: "dip.green/40" })}
            />
          </div>
        </div>

        <div className={stack({ gap: "0" })}>
          <span className={labelStyle}>Active Sessions</span>
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
              className={css({ w: "30%", h: "full", bg: "dip.gray" })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
