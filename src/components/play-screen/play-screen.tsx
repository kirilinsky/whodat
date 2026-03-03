"use client";

import { useState } from "react";
import { css } from "@/styled-system/css";
import { center } from "@/styled-system/patterns";
import { AnimatePresence, motion } from "framer-motion";

export const PlayScreen = () => {
  const [ripples, setRipples] = useState<{ id: number }[]>([]);

  const handleClick = () => {
    const id = Date.now();
    setRipples((prev) => [...prev, { id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 1800);
  };

  return (
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

        <motion.button
          onClick={handleClick}  
          className={css({
            position: "relative",
            animation: "glowPulse 4s ease-in-out infinite",
            bg: "black",
            color: "dip.red",
            border: "2px solid",
            borderColor: "dip.red",
            px: "12",
            py: "6",
            fontFamily: "mono",
            fontWeight: "bold",
            fontSize: "2xl",
            cursor: "pointer",
            zIndex: 10,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            overflow: "hidden",
          })}
        >
          <div className={css({ position: "relative", zIndex: 1 })}>
            START MISSION
            <div
              className={css({
                fontSize: "10px",
                mt: "1",
                opacity: 0.7,
                fontWeight: "normal",
              })}
            >
              Authorized Entry Only
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
