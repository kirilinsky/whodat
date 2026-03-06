"use client";

import { motion } from "framer-motion";
import { css } from "@/styled-system/css";
import { flex, stack } from "@/styled-system/patterns";
import { TypingText } from "../text-item/text-item";
import { UserAvatar, useUser } from "@clerk/nextjs";
import { SessionMessageType } from "@/types/message.types";
import { useEffect, useRef } from "react";
import { SUCCESS_MESSAGES } from "@/app/constants/chat.constants";
import Link from "next/link";
import { EntityCategoryType } from "@/app/constants/entity.constants";

export default function ChatField({
  category,
  messages,
  success,
  locale = "ru",
}: {
  success: boolean | null;
  messages: SessionMessageType[];
  locale?: "ru" | "en" | "de";
  category?: EntityCategoryType;
}) {
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, []);

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages, success]);

  return (
    <div
      className={stack({
        gap: { base: "5", md: "8" },
        py: { base: "3", md: "4" },
        w: "full",
        maxW: { base: "full", md: "800px" },
        mx: { base: "0", md: "auto" },
        minH: { base: "calc(100vh - 245px)", md: "full" },
        flexGrow: 1,
        px: { base: "4", md: "0" },
        pb: { base: "5", md: "20" },
      })}
    >
      {messages.map((msg, index) => {
        const isLastMessage = index === messages.length - 1;
        return (
          <div
            key={msg.id}
            className={flex({
              direction: "column",
              align: msg.bot ? "flex-start" : "flex-end",
              w: "full",
            })}
          >
            <div
              className={flex({
                align: "center",
                gap: "3",
                mb: "2",
                flexDirection: msg.bot ? "row" : "row-reverse",
              })}
            >
              <div
                className={css({
                  w: "8",
                  h: "8",
                  borderRadius: "full",
                  border: "1px solid",
                  borderColor: msg.bot ? "dip.red/40" : "white/20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bg: msg.bot ? "dip.red/10" : "white/5",
                  color: msg.bot ? "dip.red" : "white/40",
                  fontSize: "xs",
                })}
              >
                {msg.bot ? "👤" : <UserAvatar />}
              </div>
              <span
                className={css({
                  fontSize: "10px",
                  fontFamily: "mono",
                  letterSpacing: "widest",
                  color: msg.bot ? "dip.red" : "white/40",
                  textTransform: "uppercase",
                })}
              >
                {msg.bot ? "Subject" : user?.firstName}
              </span>
            </div>

            <div
              className={css({
                p: "5",
                maxW: "85%",
                bg: msg.bot ? "rgba(20, 10, 10, 0.8)" : "rgba(30, 30, 30, 0.4)",
                border: "1px solid",
                borderColor: msg.bot ? "dip.red/20" : "white/10",
                borderRadius: "sm",
                position: "relative",
                color: "white/90",
                fontSize: "sm",
                lineHeight: "1.7",
                fontFamily: "mono",
                boxShadow: msg.bot ? "0 0 20px rgba(255, 0, 0, 0.05)" : "none",
              })}
            >
              <p>
                {msg.bot ? (
                  isLastMessage ? (
                    <TypingText text={msg.content} />
                  ) : (
                    msg.content
                  )
                ) : (
                  <span className={css({ color: "white/60" })}>
                    {msg.content}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className={css({
            alignSelf: "center",
            w: "full",
            maxW: "md",
            mt: "4",
            p: "4",
            bg: "dip.red/10",
            border: "1px double",
            borderColor: "dip.red",
            position: "relative",
            textAlign: "center",
            boxShadow: "0 0 20px token(colors.dip.red_dark)",
          })}
        >
          <div
            className={css({
              color: "white",
              fontFamily: "mono",
              fontSize: "sm",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              animation: "pulse 2s infinite",
            })}
          >
            {SUCCESS_MESSAGES[locale as keyof typeof SUCCESS_MESSAGES]}
          </div>
          <div
            className={css({
              fontSize: "9px",
              color: "dip.green",
              mt: "2",
              opacity: 0.7,
              fontFamily: "mono",
            })}
          >
            XP CREDITS TRANSFERRED TO YOUR ACCOUNT
          </div>
          <Link
            href={`/dashboard?cat=${category}`}
            className={flex({
              align: "center",
              justifyContent: "center",
              gap: "2",
              color: "white/50",
              fontFamily: "mono",
              fontSize: "xs",
              textTransform: "uppercase",
              letterSpacing: "widest",
              transition: "all 0.2s ease",
              width: "full",
              _hover: {
                color: "dip.red",
                transform: "translateX(-4px)",
              },
            })}
          >
            <span className={css({ fontSize: "lg" })}>←</span>
            <span>вернуться к списку персонажей</span>
          </Link>
        </motion.div>
      )}
      <div ref={messagesEndRef} className={css({ h: "1px" })} />
    </div>
  );
}
