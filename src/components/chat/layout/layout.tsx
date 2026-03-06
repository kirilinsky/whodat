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

export default function ChatLayout({
  entity,
  session,
  initialMessages,
}: {
  entity: EnrichedEntityType | null;
  session: SessionType;
  initialMessages: SessionMessageType[];
}) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: { base: "1fr", lg: "380px 1fr" },
        h: "calc(100vh - 97px)",
        w: "full",
        bg: "black",
        gap: "0",
        overflow: "hidden",
      })}
    >
      {entity && <MobileInfo attempts={session.attempts} entity={entity} />}
      {entity && <Aside success={session.success} entity={entity} />}
      <main
        className={flex({
          direction: "column",
          h: "full",
          minH: 0,
          position: "relative",
          bg: "rgba(15, 7, 7, 1)",
        })}
      >
        <div
          className={css({
            flex: "1",
            overflowY: "auto",
            p: { base: "3", lg: "6" },
          })}
        >
          <ChatField
            category={entity?.category}
            success={session.success}
            messages={initialMessages}
          />
        </div>
        <div
          className={css({
            p: { base: "0", md: "5" },
            py: { base: 1 },
            borderTop: "1px solid",
            borderColor: "white/50",
            bg: "black",
          })}
        >
          <div className={css({ display: { base: "none", md: "block" } })}>
            <Progress current={session.attempts} />
          </div>
          <Input
            success={session.success}
            attemptsCount={session.attempts}
            sessionId={session.id}
          />
        </div>
      </main>
    </div>
  );
}
