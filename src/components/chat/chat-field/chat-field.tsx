"use client";

import { css } from "@/styled-system/css";
import { flex, stack } from "@/styled-system/patterns";
import { TypingText } from "../text-item/text-item";
import { useUser } from "@clerk/nextjs";

interface Message {
  id: number;
  content: string;
  bot: boolean;
}

export default function ChatField({ messages }: { messages: Message[] }) {
  const { user } = useUser();
  return (
    <div
      className={stack({
        gap: "8",
        py: "4",
        w: "full",
        maxW: "800px",
        mx: "auto",
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
              position: "relative",
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
                {msg.bot ? "👤" : user?.firstName?.[0]}
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
                lineHeight: "1.6",
                fontFamily: "mono",
                boxShadow: msg.bot ? "0 0 20px rgba(255, 0, 0, 0.05)" : "none",
              })}
            >
              <p>
                {msg.bot ? (
                  isLastMessage ? (
                    <TypingText text={`"${msg.content}"`} />
                  ) : (
                    `"${msg.content}"`
                  )
                ) : (
                  <span className={css({ color: "white/50" })}>
                    Query: {msg.content}
                  </span>
                )}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
