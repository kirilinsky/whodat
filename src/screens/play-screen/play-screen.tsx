"use client";

import { useState } from "react";
import { css } from "@/styled-system/css";
import { flex, center } from "@/styled-system/patterns";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/services/get-translation";

export const PlayScreen = () => {
  const [ripples, setRipples] = useState<{ id: number }[]>([]);
  const { locale } = useLocale();

  const handleClick = () => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1800);
  };

  return (
    <div
      className={flex({
        direction: "column",
        flex: 1,
        position: "relative",
        py: "12",
      })}
    >
      {/* Intro Text Section */}
      <div
        className={css({
          maxW: "600px",
          mb: "12",
          borderLeft: "2px solid",
          borderColor: "dip.red",
          pl: "6",
        })}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p
            className={css({
              color: "dip.gray",
              fontFamily: "mono",
              fontSize: "sm",
              lineHeight: "1.6",
            })}
          >
            {t("play_screen.story", locale)}
          </p>
        </motion.div>
      </div>

      <div className={center({ flex: 1, position: "relative" })}>
        <div className={css({ position: "relative" })}>
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                initial={{ opacity: 0.7, scale: 1, borderWidth: "1.8px" }}
                animate={{ opacity: 0, scale: 2.5, borderWidth: "0px" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className={css({
                  position: "absolute",
                  inset: 0,
                  border: "2px solid",
                  borderColor: "dip.red",
                  zIndex: 0,
                  pointerEvents: "none",
                })}
              />
            ))}
          </AnimatePresence>

          <Link href="/dashboard">
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={css({
                position: "relative",
                animation: "glowPulse 4s ease-in-out infinite",
                bg: "black",
                color: "dip.red",
                border: "2px solid",
                borderColor: "dip.red",
                px: "16",
                py: "8",
                fontFamily: "mono",
                fontWeight: "bold",
                fontSize: "3xl",
                cursor: "pointer",
                zIndex: 10,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                overflow: "hidden",
                _before: {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "10px",
                  height: "10px",
                  borderTop: "2px solid",
                  borderLeft: "2px solid",
                  borderColor: "dip.red",
                },
              })}
            >
              <div className={css({ position: "relative", zIndex: 1 })}>
                {t("play_screen.button", locale)}
                <div
                  className={css({
                    fontSize: "12px",
                    mt: "2",
                    opacity: 0.8,
                    fontWeight: "normal",
                    letterSpacing: "normal",
                  })}
                >
                  {t("play_screen.protocol", locale)}
                </div>
              </div>
            </motion.button>
          </Link>
        </div>
      </div>

      <div
        className={flex({
          justify: "space-between",
          align: "flex-end",
          mt: "12",
        })}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={css({
            mx: { base: "3", md: "0" },
            maxW: { base: "full", md: "420px" },
          })}
        >
          <div
            className={css({
              bg: "whiteAlpha.50",
              p: "4",
              border: "1px solid",
              borderColor: "whiteAlpha.200",
            })}
          >
            <p
              className={css({
                color: "white",
                fontSize: "xs",
                mb: "2",
                fontWeight: "bold",
                textTransform: "uppercase",
              })}
            >
              {t("play_screen.mission_objective", locale)}:
            </p>
            <p
              className={css({
                color: "dip.gray",
                fontFamily: "mono",
                fontSize: "xs",
                lineHeight: "1.4",
              })}
            >
              {t("play_screen.mission", locale)}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
