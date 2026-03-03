import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <main
      className={flex({
        direction: "column",
        flex: "1",
        width: "full",
        position: "relative",
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        _before: {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.4) 100%)",
          pointerEvents: "none",
        },
      })}
    >
      <div
        className={css({
          width: "full",
          maxW: "7xl",
          mx: "auto",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          px: { base: "4", md: "12" },
          py: "8",
          position: "relative",
          zIndex: 1,
        })}
      >
        {children}
      </div>
    </main>
  );
};
