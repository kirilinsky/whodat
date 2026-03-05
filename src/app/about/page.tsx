"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { stack, flex } from "@/styled-system/patterns";

export default function AboutPage() {
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
          whodat is a social deduction experiment designed to test human
          intuition against reconstructed historical personas. In the age of
          digital decay, names are the first to vanish. Your objective is to
          restore the connection.
        </p>
      </section>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
            CORE_ENGINE
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
            DATABASE
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
            AUTH_LAYER
          </span>
          <span className={css({ color: "white", fontSize: "xs" })}>
            CLERK SECURE
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
            NEW CHARACTER
          </span>
          <span className={css({ color: "white", fontSize: "xs" })}>
            EVERY 24 HOURS
          </span>
        </div>
      </div>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5 }}
        className={flex({
          justify: "space-between",
          align: "center",
          mt: "10",
        })}
      ></motion.footer>
    </div>
  );
}
