"use client";

import { EntityCategory } from "@/app/constants/entities.constants";
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
              })}
            >
              {/* TODO locale */}
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
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              transition: "colors",
              color: isActive ? "white" : "dip.gray",
              _hover: { color: "dip.red" },
            })}
          >
            {isActive && (
              <>
                <div
                  className={css({
                    position: "absolute",
                    insetX: "-4",
                    insetY: "-2",
                    border: "1px solid",
                    borderColor: "dip.red/30",
                    bg: "dip.red/5",
                  })}
                />
                <div
                  className={css({
                    position: "absolute",
                    bottom: "-17px",
                    insetX: "-4",
                    h: "2px",
                    bg: "dip.red",
                  })}
                />
                <span
                  className={css({
                    w: "1.5",
                    h: "1.5",
                    rounded: "full",
                    bg: "dip.red",
                    boxShadow: "0 0 8px {colors.dip.red}",
                  })}
                />
              </>
            )}
            {/* TODO locale */}
            <span>{getCategoryLabel(cat, "ru")}</span>
          </Link>
        );
      })}
    </nav>
  );
}
