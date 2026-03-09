"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { stack, flex } from "@/styled-system/patterns";
import { useLocale } from "@/hooks/use-locale";
import { t } from "@/services/get-translation";

export default function TermsOfEntry() {
  const { locale } = useLocale();

  const sections = [
    {
      title: t("terms.sections.ai_title", locale),
      content: t("terms.sections.ai_content", locale),
    },
    {
      title: t("terms.sections.ops_title", locale),
      content: t("terms.sections.ops_content", locale),
    },
    {
      title: t("terms.sections.data_title", locale),
      content: t("terms.sections.data_content", locale),
    },
    {
      title: t("terms.sections.warranty_title", locale),
      content: t("terms.sections.warranty_content", locale),
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
          [ {t("terms.system_protocol", locale)} ]
        </span>
        <span className={css({ color: "white/20", fontSize: "10px" })}>
          {t("terms.version", locale)}
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
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "tight",
          })}
        >
          {t("terms.acceptance", locale)}
        </span>
      </div>
    </div>
  );
}
