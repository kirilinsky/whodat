"use client";
import { useState } from "react";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";

interface InputProps {
  attemptsCount: number;
  isLoading?: boolean;
}

export default function Input({ attemptsCount, isLoading }: InputProps) {
  const [value, setValue] = useState("");
  const isDisabled = attemptsCount <= 0 || isLoading;
  const maxLength = 32;

  const handleSubmit = (e?: React.SubmitEvent) => {
    e?.preventDefault();
    if (value.trim() && !isDisabled) {
      setValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={flex({
        direction: "row",
        gap: "4",
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
          px: "4",
          borderRadius: "sm",
          position: "relative",
          _focusWithin: {
            borderColor: "dip.red",
            bg: "rgba(255, 0, 0, 0.02)",
          },
        })}
      >
        <span
          className={css({
            color: isDisabled ? "white/10" : "dip.red",
            fontFamily: "mono",
            mr: "3",
            fontSize: "sm",
          })}
        >
          {">"}
        </span>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            isDisabled
              ? "INTERROGATION TERMINATED"
              : "Enter interrogation command..."
          }
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
            py: "4",
            _placeholder: { color: "white/20" },
            _disabled: { cursor: "not-allowed" },
          })}
        />
        <span
          className={css({
            fontSize: "10px",
            color: value.length >= maxLength ? "dip.red" : "white/20",
            fontFamily: "mono",
            ml: "2",
          })}
        >
          {value.length}/{maxLength}
        </span>
      </div>
      <button
        type="submit"
        disabled={isDisabled || !value.trim()}
        className={css({
          bg: "dip.red",
          color: "white",
          px: "8",
          display: "flex",
          alignItems: "center",
          gap: "3",
          fontSize: "xs",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "widest",
          cursor: "pointer",
          transition: "all 0.2s ease",
          borderRadius: "sm",
          _hover: {
            bg: "red.600",

            boxShadow: "0 4px 2px dip.dark_red",
          },
          _active: { transform: "translateY(0)" },
          _disabled: {
            bg: "white/5",
            color: "white/20",
            cursor: "not-allowed",
            boxShadow: "none",
            transform: "none",
          },
        })}
      >
        <span>Send Data</span>
        {/* TODO move svg into dedicated component */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
}
