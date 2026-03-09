"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import GridItem from "../grid-item/grid-item";
import { EnrichedEntityType } from "@/types/entity.types";
import { useLocale } from "@/hooks/use-locale";

export default function EntitiesGrid({
  entities,
}: {
  entities: EnrichedEntityType[];
}) {
  const { locale } = useLocale();

  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: {
          base: "1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: "6",
        w: "full",
        maxW: "1260px",
        mx: "auto",
        py: "6",
        px: { base: "4", md: "0" },
        justifyItems: "center",
      })}
    >
      {entities.map((entity, i) => (
        <motion.div
          key={entity.id}
          className={css({
            w: "full",
            maxW: { base: "335px", md: "full" },
          })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: [0.23, 1, 0.32, 1],
          }}
          whileHover={{ y: -4 }}
        >
          <GridItem locale={locale} entity={entity} />
        </motion.div>
      ))}
    </div>
  );
}
