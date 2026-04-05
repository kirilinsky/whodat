"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { grid, stack } from "@/styled-system/patterns";
import Bio from "../bio/bio";
import { UserType } from "@/types/user.types";
import { CategoryStatsType, StatsType } from "@/types/profile.types";
import Statistics from "../statistics/statistics";
import CategoryStatistics from "../categories/categories";
import Progression from "../progression/progression";
import { useLocale } from "@/hooks/use-locale";

interface ProfileLayoutProps {
  user: UserType;
  stats: StatsType;
  categoryStats: CategoryStatsType[];
}

export default function ProfileLayout({
  user,
  stats,
  categoryStats,
}: ProfileLayoutProps) {
  const { locale } = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={css({
        w: "full",
        maxW: "1400px",
        mx: "auto",
        p: { base: "4", md: "8" },
        minH: "100vh",
      })}
    >
      <div
        className={grid({
          columns: { base: 1, lg: 12 },
          gap: "6",
          alignItems: "start",
        })}
      >
        <aside
          className={css({
            gridColumn: { base: "span 1", lg: "span 4" },
          })}
        >
          <Bio locale={locale} user={user} />
        </aside>

        <main
          className={css({
            gridColumn: { base: "span 1", lg: "span 8" },
          })}
        >
          <div className={stack({ gap: "6" })}>
            <Statistics locale={locale} stats={stats} />
            <CategoryStatistics locale={locale} categories={categoryStats} />
            <Progression locale={locale} xp={user.xp} rank={user.rank} />
          </div>
        </main>
      </div>
    </motion.div>
  );
}
