"use client";

import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import Aside from "../aside/aside";
import { EnrichedEntityType } from "@/types/entity.types";
import Progress from "../progress/progress";
import Input from "../input/input";
import { SessionType } from "@/types/session.types";
import ChatField from "../chat-field/chat-field";
import { SessionMessageType } from "@/types/message.types";
import MobileInfo from "../mobile-info/mobile-info";
import { useLocale } from "@/hooks/use-locale";

export default function ChatLayout({
  entity,
  session,
  initialMessages,
}: {
  entity: EnrichedEntityType | null;
  session: SessionType;
  initialMessages: SessionMessageType[];
}) {
  const { locale } = useLocale();

  return (
    <div
      className={css({
        display: { base: "flex", md: "grid" },
        flexDirection: "column",
        gridTemplateColumns: {
          md: "320px 1fr",
          lg: "380px 1fr",
        },
        flex: "1",
        minH: 0,
        w: "full",
        bg: "black",
        overflow: "hidden",
      })}
    >
      {entity && (
        <div
          className={css({
            display: { base: "block", md: "none" },
            flexShrink: 0,
          })}
        >
          <MobileInfo
            locale={locale}
            attempts={session.attempts}
            entity={entity}
          />
        </div>
      )} 
      {entity && (
        <Aside locale={locale} success={session.success} entity={entity} />
      )}

      <main
        className={flex({
          direction: "column",
          flex: "1",
          minH: 0,
          bg: "rgba(15, 7, 7, 1)",
        })}
      >
        <div
          className={css({
            flex: "1",
            overflowY: "auto",
            p: { base: "3", lg: "5" },
            scrollbarWidth: "none",
          })}
        >
          <ChatField
            category={entity?.category}
            success={session.success}
            messages={initialMessages}
            locale={locale}
          />
        </div>
        <div
          className={css({
            flexShrink: 0,
            p: { base: "2", md: "5" },
            borderTop: "1px solid",
            borderColor: "white/10",
            bg: "black",
          })}
        >
          <div className={css({ display: { base: "none", md: "block" } })}>
            <Progress locale={locale} current={session.attempts} />
          </div>
          <Input
            success={session.success}
            attemptsCount={session.attempts}
            sessionId={session.id}
            locale={locale}
          />
        </div>
      </main>
    </div>
  );
}
