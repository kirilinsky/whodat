"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { stack, flex, grid } from "@/styled-system/patterns";
import { RANK_THRESHOLDS } from "@/app/constants/user.constants";
import { getRankLabel } from "@/services/get-rank-label";
import { Shield, Zap, Target, Star } from "lucide-react";

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
        <p className={css({ color: "white/70", fontSize: "sm", lineHeight: "1.8" })}>
          WhoDat — это социальный эксперимент по дедукции, разработанный для проверки человеческой 
          интуиции против реконструированных исторических личностей. В эпоху цифрового распада 
          имена исчезают первыми. Ваша задача — восстановить связь.
        </p>
      </section>

       <section className={stack({ gap: "6" })}>
        <div className={flex({ align: "center", gap: "2" })}>
          <div className={css({ w: "2", h: "2", bg: "dip.red", transform: "rotate(45deg)" })} />
          <h2 className={css({ color: "white", fontSize: "xs", letterSpacing: "0.2em", textTransform: "uppercase" })}>
            Progression_Protocol
          </h2>
        </div>
        
        <p className={css({ color: "white/50", fontSize: "xs", lineHeight: "1.6" })}>
          Каждая успешная идентификация субъекта приносит очки опыта (XP). 
          Накопление XP повышает ваш уровень допуска, открывая доступ к более глубоким слоям 
          архива — от Античности до Новейшего времени.
        </p>

        <div className={grid({ columns: { base: 1, sm: 2 }, gap: "4" })}>
          {[0, 2, 5, 7].map((level) => (
            <div 
              key={level} 
              className={flex({ 
                align: "center", 
                gap: "3", 
                p: "3", 
                bg: "white/2", 
                border: "1px solid", 
                borderColor: "white/5" 
              })}
            >
              <span className={css({ color: "dip.red", fontSize: "14px" })}>
                {level === 0 && <Target size={16} />}
                {level === 2 && <Shield size={16} />}
                {level === 5 && <Zap size={16} />}
                {level === 7 && <Star size={16} />}
              </span>
              <div className={stack({ gap: "0" })}>
                <span className={css({ color: "white", fontSize: "xs", fontWeight: "bold" })}>
                  {getRankLabel(level, "ru")}
                </span>
                <span className={css({ color: "white/30", fontSize: "10px" })}>
                  LEVEL {level} / {RANK_THRESHOLDS[level as keyof typeof RANK_THRESHOLDS]} XP
                </span>
              </div>
            </div>
          ))}
        </div>
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
          <span className={css({ display: "block", color: "dip.red", fontSize: "10px", mb: "1" })}>CORE_ENGINE</span>
          <span className={css({ color: "white", fontSize: "xs" })}>GPT-4O-MINI / LLM</span>
        </div>
        <div>
          <span className={css({ display: "block", color: "dip.red", fontSize: "10px", mb: "1" })}>DATABASE</span>
          <span className={css({ color: "white", fontSize: "xs" })}>POSTGRES / DRIZZLE</span>
        </div>
        <div>
          <span className={css({ display: "block", color: "dip.red", fontSize: "10px", mb: "1" })}>PROGRESSION</span>
          <span className={css({ color: "white", fontSize: "xs" })}>8 ACCESS LEVELS</span>
        </div>
        <div>
          <span className={css({ display: "block", color: "dip.red", fontSize: "10px", mb: "1" })}>NEW ARCHIVE</span>
          <span className={css({ color: "white", fontSize: "xs" })}>EVERY 24 HOURS</span>
        </div>
      </div>
    </div>
  );
}