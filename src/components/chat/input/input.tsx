"use client";

import { useState, useTransition } from "react";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { sendMessage } from "@/app/actions/chat";
import { t } from "@/services/get-translation";
import { Locale } from "@/services/get-server-locale";

interface InputProps {
  sessionId: number;
  attemptsCount: number;
  success: boolean;
  locale: Locale;
}

export default function Input({
  sessionId,
  attemptsCount,
  success,
  locale,
}: InputProps) {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const isDisabled = attemptsCount <= 0 || isPending || success;
  const maxLength = 32;

  const getPlaceholder = () => {
    if (success) return t("chat_input.identified", locale);
    if (attemptsCount <= 0) return t("chat_input.terminated", locale);
    return t("chat_input.placeholder", locale);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (value.trim() && !isDisabled) {
      const messageContent = value.trim();
      setValue("");

      startTransition(async () => {
        try {
          const result = await sendMessage(sessionId, messageContent);
          if (result?.error) {
            console.error(result.error);
          }
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      });
    }
  };

  return (
    <div className={flex({ direction: "column", w: "full", gap: "2" })}>
      <form
        onSubmit={handleSubmit}
        className={flex({
          direction: "row",
          gap: { base: "2", md: "3" },
          w: "full",
          align: "stretch",
        })}
      >
        <div
          className={flex({
            flex: "1",
            align: "center",
            bg: "rgba(255, 255, 255, 0.02)",
            border: "1px solid",
            borderColor: isDisabled ? "white/5" : "white/10",
            px: { base: "2", md: "4" },
            borderRadius: "sm",
            position: "relative",
            _focusWithin: {
              borderColor: success ? "dip.green" : "dip.red",
              bg: success ? "rgba(0, 255, 0, 0.02)" : "rgba(255, 0, 0, 0.02)",
            },
          })}
        >
          <span
            className={css({
              color: isDisabled ? "white/10" : "dip.red",
              fontFamily: "mono",
              mr: "2",
              fontSize: "sm",
            })}
          >
            {">"}
          </span>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={getPlaceholder()}
            disabled={isDisabled}
            maxLength={maxLength}
            className={css({
              flex: "1",
              bg: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "sm",
              fontFamily: "mono",
              py: { base: "3", md: "4" },
              _placeholder: {
                color: success ? "dip.green/40" : "white/20",
                textTransform: "uppercase",
                fontSize: "10px",
              },
              _disabled: { cursor: "not-allowed" },
            })}
          />
          <span
            className={css({
              fontSize: "10px",
              color: value.length >= maxLength ? "dip.red" : "white/40",
              fontFamily: "mono",
              ml: "2",
            })}
          >
            {value.length}/{maxLength}
          </span>
        </div>

        <button
          type="submit"
          disabled={isDisabled || !value.trim() || value.length > maxLength}
          className={css({
            bg: "dip.red",
            color: "white",
            px: { base: "2", md: "8" },
            display: "flex",
            alignItems: "center",
            gap: { base: "1", md: "3" },
            fontSize: "xs",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "widest",
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderRadius: "sm",
            minW: "fit-content",
            _hover: {
              bg: "red.600",
              boxShadow: "0 4px 12px rgba(255, 0, 0, 0.3)",
            },
            _disabled: {
              bg: "white/10",
              color: "white/20",
              cursor: "not-allowed",
            },
          })}
        >
          <span>
            {isPending
              ? t("chat_input.processing", locale)
              : t("chat_input.send", locale)}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isPending ? css({ animation: "pulse 1s infinite" }) : ""}
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      <p
        className={css({
          fontSize: "8px",
          color: "white/40",
          fontFamily: "mono",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "tighter",
        })}
      >
        {t("chat_input.disclaimer", locale)}
      </p>
    </div>
  );
}
