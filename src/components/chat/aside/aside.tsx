"use client";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryLabel } from "@/services/get-category-label";
import { css } from "@/styled-system/css";
import { stack, flex } from "@/styled-system/patterns";
import { EnrichedEntityType } from "@/types/entity.types";
import { DataField } from "../data-field/data-field";

interface ChatAsideProps {
  entity: EnrichedEntityType;
  success: boolean;
  locale?: "ru" | "en" | "de";
}

export default function Aside({
  success,
  entity,
  locale = "ru",
}: ChatAsideProps) {
  const { locked, played, imageUrl, name, category } = entity;
  const lockedImageUrl = imageUrl ? `/categories/${category}.webp` : null;

  return (
    <aside
      className={stack({
        gap: "5",
        w: "full",
        color: "white",
        fontFamily: "mono",
        py: "3",
        maxH: "full",
        overflowY: "auto",
        scrollbar: "hidden",
      })}
    >
      <div
        className={css({
          position: "relative",
          border: "1px solid",
          borderColor: success ? "dip.red" : "white/15",
          p: "4",
          bg: "dip.gray_card",
          transition: "border-color 1s ease",
          animation: success ? "glowPulse 3s infinite" : "none",
        })}
      >
        <div
          className={css({
            aspectRatio: "3/4",
            bg: "black",
            mb: "4",
            position: "relative",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "white/10",
          })}
        >
          <AnimatePresence mode="popLayout">
            {success ? (
              <motion.img
                key="real"
                src={imageUrl || ""}
                initial={{ opacity: 0, scale: 1.1, filter: "brightness(2)" }}
                animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={css({ w: "full", h: "full", objectFit: "cover" })}
              />
            ) : (
              <motion.img
                key="locked"
                src={lockedImageUrl || ""}
                exit={{ opacity: 0, filter: "brightness(3) blur(10px)" }}
                transition={{ duration: 1 }}
                className={css({
                  w: "full",
                  h: "full",
                  objectFit: "cover",
                  filter: "grayscale(1) brightness(0.3) blur(4px)",
                })}
              />
            )}
          </AnimatePresence>
          <div
            className={css({
              position: "absolute",
              inset: 0,
              bg: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 2px)",
              pointerEvents: "none",
              zIndex: 10,
            })}
          />
        </div>

        <div className={stack({ gap: "1" })}>
          <div className={flex({ justify: "space-between", align: "center" })}>
            <span className={css({ color: "dip.red", fontSize: "10px" })}>
              ID: {entity.id}
            </span>
            {played && !success && (
              <span
                className={css({
                  fontSize: "9px",
                  px: "2",
                  py: "0.5",
                  bg: "dip.red_dark",
                  color: "white",
                  border: "1px solid",
                  borderColor: "dip.red/30",
                })}
              >
                ACTIVE SESSION
              </span>
            )}
          </div>

          <motion.h3
            animate={{ color: success ? "#e0d7d7" : "rgba(255,255,255,0.4)" }}
            className={css({
              fontSize: "xl",
              fontWeight: "bold",
              textTransform: "uppercase",
            })}
          >
            {name[locale]}
          </motion.h3>
        </div>
      </div>

      <div className={stack({ gap: "1" })}>
        <DataField
          label="Current Status"
          value={success ? "IDENTIFIED" : "CLASSIFIED"}
          isAlert={!success}
        />
        <DataField
          label="Threat Category"
          value={getCategoryLabel(category, locale)}
        />
      </div>
    </aside>
  );
}
