"use client";

import { motion } from "framer-motion";
import { EntityCategory } from "@/app/constants/entity.constants";
import { getCategoryLabel } from "@/services/get-category-label";
import { css } from "@/styled-system/css";
import Link from "next/link";
import {
  RANK_ICONS,
  RANK_THRESHOLDS,
  RankLevel,
} from "@/app/constants/user.constants";
import { getRankLabel } from "@/services/get-rank-label";
import { UserType } from "@/types/user.types";
import { t } from "@/services/get-translation";
import { useLocale } from "@/hooks/use-locale";

interface CategoryTabsProps {
  active: number;
  user: UserType;
}

export default function CategoryTabs({ active, user }: CategoryTabsProps) {
  const categories = Object.values(EntityCategory) as number[];
  const { locale } = useLocale();

  return (
    <nav
      className={css({
        display: "flex",
        flexWrap: "wrap",
        gap: { base: "2", md: "4" },
        borderBottom: "1px solid",
        borderColor: "white/10",
        pb: "6",
        fontFamily: "mono",
        fontSize: "11px",
        justifyContent: { base: "center", sm: "flex-start" },
      })}
    >
      {categories.map((cat) => {
        const isActive = active === cat;
        const isLocked = cat > user.rank;
        const Icon = RANK_ICONS[cat as RankLevel];

        const requiredXp = RANK_THRESHOLDS[cat as RankLevel];
        const xpToUnlock = requiredXp - user.xp;

        if (isLocked) {
          return (
            <div
              key={cat}
              className={
                "group " +
                css({
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "2",
                  px: "3",
                  py: "2",
                  color: "white/10",
                  cursor: "not-allowed",
                  border: "1px solid transparent",
                })
              }
            >
              <Icon
                size={14}
                strokeWidth={1}
                className={css({ opacity: 0.3 })}
              />
              <span
                className={css({
                  textTransform: "uppercase",
                  letterSpacing: "widest",
                })}
              >
                {getCategoryLabel(cat, locale)}
              </span>

              <div
                className={css({
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(5px)",
                  bg: "black",
                  border: "1px solid",
                  borderColor: "dip.red/40",
                  p: "2",
                  mt: "2",
                  whiteSpace: "nowrap",
                  zIndex: 50,
                  opacity: 0,
                  visibility: "hidden",
                  transition: "all 0.2s ease-in-out",
                  display: { base: "none", md: "block" },
                  ".group:hover &": {
                    opacity: 1,
                    visibility: "visible",
                    transform: "translateX(-50%) translateY(0)",
                  },
                })}
              >
                <p
                  className={css({
                    color: "dip.red",
                    fontSize: "10px",
                    fontWeight: "bold",
                  })}
                >
                  {t("categories.required_rank", locale)}:{" "}
                  {getRankLabel(cat, locale).toUpperCase()}
                </p>
                <p className={css({ color: "white/60", fontSize: "9px" })}>
                  {t("categories.xp_to_unlock", locale)}{" "}
                  {xpToUnlock.toLocaleString()}
                </p>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={cat}
            href={`/dashboard?cat=${cat}`}
            className={css({
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "2",
              px: { base: "3", md: "4" },
              py: "2",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              transition: "all 0.2s ease",
              color: isActive ? "white" : "white/40",
              border: "1px solid",
              borderColor: isActive ? "dip.red/30" : "transparent",
              bg: isActive ? "dip.red/10" : "transparent",
              borderRadius: "sm",
              _hover: { color: "white", bg: "white/5" },
            })}
          >
            {Icon && (
              <Icon
                size={14}
                strokeWidth={isActive ? 2 : 1.5}
                className={css({ color: isActive ? "dip.red" : "inherit" })}
              />
            )}

            <span className={css({ position: "relative", zIndex: 1 })}>
              {getCategoryLabel(cat, locale)}
            </span>

            {isActive && (
              <motion.div
                layoutId={
                  typeof window !== "undefined" && window.innerWidth > 768
                    ? "active-tab-underline"
                    : undefined
                }
                className={css({
                  position: "absolute",
                  bottom: "-1px",
                  insetX: "0",
                  h: "2px",
                  bg: "dip.red",
                  boxShadow: "0 0 10px token(colors.dip.red)",
                })}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
