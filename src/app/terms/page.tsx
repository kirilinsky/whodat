"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { stack, flex } from "@/styled-system/patterns";

export default function TermsOfEntry() {
  const sections = [
    {
      title: "01. ARTIFICIAL INTELLIGENCE",
      content:
        "All dialogues are powered by the GPT-4o-mini neural network. The AI may hallucinate, provide historically inaccurate data, or behave provocatively as part of its persona.",
    },
    {
      title: "02. OPERATIONAL LIMITS",
      content:
        "Users are granted 7 interrogation attempts per session. Inputs are strictly limited to 32 characters to maintain system stability.",
    },
    {
      title: "03. DATA RETENTION",
      content:
        "We use Clerk for authentication. Your interrogation history and XP progress are stored in our database in Supabase (PSQL).",
    },
    {
      title: "04. NO WARRANTY",
      content:
        "This project is provided 'as is'. We do not guarantee 100% uptime. The Archive may go offline for maintenance or due to 'Temporal Distortions'.",
    },
  ];

  return (
    <div
      className={css({
        w: "full", 
        p: "6",
        fontFamily: "mono",
      })}
    >
      <div
        className={flex({
          justify: "space-between",
          mb: "6",
          borderBottom: "1px solid",
          borderColor: "dip.red/30",
          pb: "3",
        })}
      >
        <span
          className={css({
            color: "dip.red",
            fontSize: "xs",
            fontWeight: "bold",
          })}
        >
          [ SYSTEM_PROTOCOL: TERMS_OF_ENTRY ]
        </span>
        <span className={css({ color: "white/20", fontSize: "10px" })}>
          Ver. 2026.03.05
        </span>
      </div>

      <div className={stack({ gap: "6" })}>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4
              className={css({
                color: "white",
                fontSize: "sm",
                mb: "4",
                letterSpacing: "widest",
              })}
            >
              {section.title}
            </h4>
            <p
              className={css({
                color: "white/50",
                fontSize: "xs",
                lineHeight: "1.6",
              })}
            >
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      <div
        className={css({
          mt: "8",
          p: "3",
          bg: "white/5",
          border: "1px dashed",
          borderColor: "white/10",
          textAlign: "center",
        })}
      >
        <span
          className={css({
            color: "dip.red/60",
            fontSize: "14px",
            textTransform: "uppercase",
          })}
        >
          By proceeding, you accept the encryption protocols above.
        </span>
      </div>
    </div>
  );
}
