"use client";

import { motion } from "framer-motion";
import { EntityCategory } from "@/app/constants/entity.constants";
import { getCategoryLabel } from "@/services/get-category-label";
import { css } from "@/styled-system/css";
import Link from "next/link";

export default function CategoryTabs({ active }: { active: number }) {
  const categories = Object.values(EntityCategory);

  return (
    <nav
      className={css({
        display: "flex",
        flexWrap: "wrap",
        gap: "6",
        borderBottom: "1px solid",
        borderColor: "white/10",
        pb: "4",
        fontFamily: "mono",
        fontSize: "12px",
      })}
    >
      {categories.map((cat, index) => {
        const isActive = active === cat;
        const isLocked = index > 1;

        if (isLocked) {
          return (
            <div
              key={cat}
              className={css({
                textDecoration: "line-through",
                textTransform: "uppercase",
                color: "white/20",
                cursor: "not-allowed",
              })}
            >
              <span>{getCategoryLabel(cat, "ru")}</span>
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
              gap: "3",
              px: "2",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              transition: "color 0.3s ease",
              color: isActive ? "white" : "dip.gray",
              _hover: { color: "dip.red" },
            })}
          >
            {isActive && (
              <>
                <motion.div
                  layoutId="active-tab-bg"
                  className={css({
                    position: "absolute",
                    insetX: "-2",
                    insetY: "-2",
                    border: "1px solid",
                    borderColor: "dip.red/30",
                    bg: "dip.red/5",
                    zIndex: -1,
                  })}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />

                <motion.div
                  layoutId="active-tab-underline"
                  className={css({
                    position: "absolute",
                    bottom: "-17px",
                    insetX: "-2",
                    h: "2px",
                    bg: "dip.red",
                    boxShadow: "0 0 10px token(colors.dip.red)",
                  })}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
                <motion.span
                  layoutId="active-tab-dot"
                  className={css({
                    w: "1.5",
                    h: "1.5",
                    rounded: "full",
                    bg: "dip.red",
                    boxShadow: "0 0 8px token(colors.dip.red)",
                  })}
                />
              </>
            )}

            <span className={css({ position: "relative", zIndex: 1 })}>
              {getCategoryLabel(cat, "ru")}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
