"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { flex, stack, center } from "@/styled-system/patterns";
import {
  RANK_ICONS,
  RANK_THRESHOLDS,
  RankLevel,
} from "@/app/constants/user.constants";
import { getRankLabel } from "@/services/get-rank-label";

export default function Progression({
  rank,
  xp,
}: {
  rank: number;
  xp: number;
}) {
  const currentRank = rank as RankLevel;
  const nextRank = (rank < 7 ? rank + 1 : 7) as RankLevel;

  const currentThreshold = RANK_THRESHOLDS[currentRank] || 0;
  const nextThreshold = RANK_THRESHOLDS[nextRank] || 2000;

  const xpInCurrentLevel = xp - currentThreshold;
  const xpRange = nextThreshold - currentThreshold;
  const progress =
    rank === 7
      ? 100
      : Math.min(100, Math.max(0, (xpInCurrentLevel / xpRange) * 100));

  const remainingXp = nextThreshold - xp;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={css({
        bg: "rgba(20, 20, 20, 0.8)",
        border: "1px solid",
        borderColor: "white/10",
        borderRadius: "xl",
        p: "8",
      })}
    >
      <div className={flex({ justify: "space-between", mb: "10" })}>
        <div className={stack({ gap: "1" })}>
          <h3
            className={css({
              color: "white",
              fontSize: "2xl",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "tight",
            })}
          >
            Rank Progression
          </h3>
          <p className={css({ color: "dip.gray", fontSize: "xs" })}>
            Career advancement trajectory
          </p>
        </div>
      </div>

      <div
        className={css({
          position: "relative",
          mb: "16",
          px: "2",
          overflowX: { base: "auto", md: "visible" },
          pb: { base: "4", md: "0" },
        })}
      >
        <div
          className={css({
            position: "absolute",
            top: "24px",
            left: "6",
            right: "6",
            h: "2px",
            bg: "white/5",
          })}
        />

        <div
          className={css({
            position: "absolute",
            top: "24px",
            left: "6",
            w: `calc(${(rank / 7) * 100}% - 12px)`,
            h: "2px",
            bg: "dip.red",
            boxShadow: "0 0 10px var(--colors-dip-red)",
            transition: "width 0.5s ease-out",
          })}
        />

        <div
          className={flex({
            justify: "space-between",
            position: "relative",
            zIndex: 1,
            minW: { base: "600px", md: "auto" },
          })}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((level) => {
            const Icon = RANK_ICONS[level as RankLevel];
            const isActive = level === rank;
            const isPassed = level < rank;

            return (
              <div
                key={level}
                className={stack({ align: "center", gap: "4", flex: 1 })}
              >
                <div
                  className={css({
                    h: "12px",
                    display: "flex",
                    alignItems: "flex-end",
                  })}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-badge"
                      className={css({
                        px: "1.5",
                        py: "0.5",
                        bg: "dip.red",
                        color: "white",
                        fontSize: "7px",
                        fontWeight: "bold",
                        borderRadius: "xs",
                        textTransform: "uppercase",
                      })}
                    >
                      Active
                    </motion.div>
                  )}
                </div>

                <div
                  className={center({
                    w: "12",
                    h: "12",
                    bg: isActive ? "dip.red" : "rgba(10,10,10,1)",
                    border: "2px solid",
                    borderColor: isActive || isPassed ? "dip.red" : "white/10",
                    borderRadius: "lg",
                    color: isActive || isPassed ? "white" : "white/20",
                    boxShadow: isActive
                      ? "0 0 20px var(--colors-dip-red)"
                      : "none",
                    transition: "all 0.3s",
                  })}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                </div>

                <div className={stack({ gap: "0", align: "center" })}>
                  <span
                    className={css({
                      fontSize: "8px",
                      fontWeight: "bold",
                      color: isActive ? "white" : "dip.gray",
                      textTransform: "uppercase",
                      textAlign: "center",
                    })}
                  >
                    {getRankLabel(level, "en")}
                  </span>
                  <span
                    className={css({
                      fontSize: "7px",
                      color: "white/10",
                      fontFamily: "mono",
                    })}
                  >
                    {RANK_THRESHOLDS[level as RankLevel]} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={stack({ gap: "3" })}>
        <div
          className={flex({
            justify: "space-between",
            color: "white",
            fontSize: "xs",
            fontFamily: "mono",
          })}
        >
          <span>
            {xp.toLocaleString()}{" "}
            <span className={css({ color: "white/20" })}>/</span>{" "}
            {nextThreshold.toLocaleString()} XP
          </span>
          {rank < 7 && (
            <span className={css({ color: "dip.gray", fontSize: "10px" })}>
              {remainingXp.toLocaleString()} XP TO NEXT LEVEL
            </span>
          )}
        </div>
        <div
          className={css({
            w: "full",
            h: "1.5",
            bg: "white/5",
            borderRadius: "full",
            overflow: "hidden",
          })}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={css({
              h: "full",
              bg: "white/40",
              boxShadow: "0 0 10px rgba(255,255,255,0.1)",
            })}
          />
        </div>
      </div>
    </motion.div>
  );
}
