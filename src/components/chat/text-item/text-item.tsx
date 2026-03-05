"use client";
import { useState, useEffect } from "react";

export function TypingText({
  text,
  speed = 32,
}: {
  text: string;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
