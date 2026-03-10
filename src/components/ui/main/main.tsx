import { css } from "@/styled-system/css";
import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
}

export const MainWrapper = ({ children }: MainWrapperProps) => {
  return (
    <main
      className={css({
        flex: "1",
        w: "full",
        position: "relative",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      })}
    >
      {children}
    </main>
  );
};
