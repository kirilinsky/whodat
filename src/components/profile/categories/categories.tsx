"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { grid, stack, flex } from "@/styled-system/patterns";
import { EntityCategoryLabels } from "@/app/constants/entity.constants";
import { CategoryStatsType } from "@/types/profile.types";
import { getCategoryLabel } from "@/services/get-category-label";
import { Locale } from "@/services/get-server-locale";
import { t } from "@/services/get-translation";

export default function CategoryStatistics({
  categories,
  locale,
}: {
  categories: CategoryStatsType[];
  locale: Locale;
}) {
  const cardStyle = css({
    bg: "rgba(20, 20, 20, 0.8)",
    border: "1px solid",
    borderColor: "white/10",
    borderRadius: "xl",
    p: "6",
  });

  const statsMap = categories.reduce(
    (acc, curr) => {
      acc[curr.category] = curr.count;
      return acc;
    },
    {} as Record<number, number>,
  );

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={cardStyle}
    >
      <div className={flex({ align: "center", gap: "2", mb: "6" })}>
        <div
          className={css({
            w: "2",
            h: "2",
            bg: "dip.green",
            transform: "rotate(45deg)",
          })}
        />
        <h3
          className={css({
            color: "white",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "widest",
            fontFamily: "mono",
          })}
        >
          {t("statistics.archive_sectors", locale)}
        </h3>
      </div>

      <div className={grid({ columns: { base: 2, md: 4 }, gap: "3" })}>
        {Object.keys(EntityCategoryLabels).map((id) => {
          const catId = Number(id);
          const countValue = statsMap[catId] || 0;
          const label = getCategoryLabel(catId, locale);

          return (
            <div
              key={catId}
              className={stack({
                gap: "1",
                p: "3",
                bg: countValue > 0 ? "white/5" : "transparent",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: countValue > 0 ? "dip.green/20" : "white/5",
                transition: "all 0.2s ease",
                opacity: countValue > 0 ? 1 : 0.4,
              })}
            >
              <span
                className={css({
                  fontSize: "9px",
                  color: countValue > 0 ? "dip.gray" : "white/30",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "mono",
                })}
              >
                {label}
              </span>

              <div className={flex({ align: "baseline", gap: "1" })}>
                <span
                  className={css({
                    fontSize: "lg",
                    fontFamily: "mono",
                    color: countValue > 0 ? "white" : "white/10",
                  })}
                >
                  {countValue}
                </span>
                <span
                  className={css({
                    fontSize: "8px",
                    color: countValue > 0 ? "dip.green/60" : "white/10",
                    fontWeight: "bold",
                    fontFamily: "mono",
                  })}
                >
                  {countValue > 0
                    ? t("statistics.done", locale)
                    : t("statistics.empty", locale)}
                </span>
              </div>

              <div
                className={css({
                  w: "full",
                  h: "2px",
                  bg: "white/5",
                  mt: "auto",
                  position: "relative",
                  overflow: "hidden",
                })}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: countValue > 0 ? "100%" : "0%" }}
                  className={css({
                    h: "full",
                    bg: "dip.green/40",
                    boxShadow:
                      countValue > 0
                        ? "0 0 8px token(colors.dip.green)"
                        : "none",
                  })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
