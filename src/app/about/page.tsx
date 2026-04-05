"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { stack, flex, grid } from "@/styled-system/patterns";
import {
  RANK_ICONS,
  RANK_THRESHOLDS,
  RankLevel,
} from "@/app/constants/user.constants";
import { getRankLabel } from "@/services/get-rank-label";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/services/get-translation";

export default function AboutPage() {
  const { locale } = useLocale(); // "ru" | "en" | "de"

  return (
    <div
      className={stack({
        maxW: "700px",
        w: "full",
        mx: "auto",
        gap: "10",
        py: "10",
        fontFamily: "mono",
      })}
    >
      <div className={stack({ gap: "2" })}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={css({
            fontSize: "2xl",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          })}
        >
          Who<span className={css({ color: "dip.red" })}>Dat</span>
        </motion.h1>
        <div className={css({ h: "1px", w: "full", bg: "white/10" })} />
      </div>

      <section className={stack({ gap: "4" })}>
        <p
          className={css({
            color: "white/70",
            fontSize: "sm",
            lineHeight: "1.8",
          })}
        >
          {t("about.description", locale)}
        </p>
      </section>

      <section className={stack({ gap: "6" })}>
        <div className={flex({ align: "center", gap: "2" })}>
          <div
            className={css({
              w: "2",
              h: "2",
              bg: "dip.red",
              transform: "rotate(45deg)",
            })}
          />
          <h2
            className={css({
              color: "white",
              fontSize: "xs",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            })}
          >
            {t("about.protocol_title", locale)}
          </h2>
        </div>

        <p
          className={css({
            color: "white/50",
            fontSize: "xs",
            lineHeight: "1.6",
          })}
        >
          {t("about.protocol_desc", locale)}
        </p>

        <div className={grid({ columns: { base: 1, sm: 2 }, gap: "4" })}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((level) => {
            const Icon = RANK_ICONS[level as RankLevel];
            return (
              <div
                key={level}
                className={flex({
                  align: "center",
                  gap: "3",
                  p: "3",
                  bg: "white/2",
                  border: "1px solid",
                  borderColor: "white/5",
                })}
              >
                <span className={css({ color: "dip.red", fontSize: "14px" })}>
                  <Icon size={16} />
                </span>
                <div className={stack({ gap: "0" })}>
                  <span
                    className={css({
                      color: "white",
                      fontSize: "xs",
                      fontWeight: "bold",
                    })}
                  >
                    {getRankLabel(level, locale)}
                  </span>
                  <span
                    className={css({ color: "white/30", fontSize: "10px" })}
                  >
                    {t("about.level_label", locale)} {level} /{" "}
                    {RANK_THRESHOLDS[level as keyof typeof RANK_THRESHOLDS]} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div
        className={grid({
          columns: 2,
          gap: "4",
          border: "1px solid",
          borderColor: "white/5",
          p: "4",
          bg: "white/2",
        })}
      >
        <div>
          <span
            className={css({
              display: "block",
              color: "dip.red",
              fontSize: "10px",
              mb: "1",
            })}
          >
            {t("about.tech_stack.engine", locale)}
          </span>
          <span className={css({ color: "white", fontSize: "xs" })}>
            GPT-4O-MINI / LLM
          </span>
        </div>
        <div>
          <span
            className={css({
              display: "block",
              color: "dip.red",
              fontSize: "10px",
              mb: "1",
            })}
          >
            {t("about.tech_stack.database", locale)}
          </span>
          <span className={css({ color: "white", fontSize: "xs" })}>
            POSTGRES / DRIZZLE
          </span>
        </div>
        <div>
          <span
            className={css({
              display: "block",
              color: "dip.red",
              fontSize: "10px",
              mb: "1",
            })}
          >
            {t("about.tech_stack.progression", locale)}
          </span>
          <span className={css({ color: "white", fontSize: "xs" })}>
            {t("about.tech_stack.levels", locale)}
          </span>
        </div>
      </div>
    </div>
  );
}
