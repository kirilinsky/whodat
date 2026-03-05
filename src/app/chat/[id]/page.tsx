import { notFound } from "next/navigation";
import { css } from "@/styled-system/css";
import { getOrCreateSession } from "@/app/actions/session";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entityId = parseInt(id);

  if (isNaN(entityId)) return notFound();

  const session = await getOrCreateSession(entityId);

  return (
    <main className={css({ p: "8", bg: "dip.bg", minH: "screen" })}>
      <header
        className={css({
          mb: "6",
          borderBottom: "1px solid",
          borderColor: "white/10",
          pb: "4",
        })}
      >
        <h1
          className={css({
            fontFamily: "mono",
            fontSize: "xl",
            color: "dip.red",
          })}
        >
          ESTABLISHING SECURE CONNECTION...
        </h1>
        <p
          className={css({
            fontFamily: "mono",
            fontSize: "xs",
            color: "dip.gray",
          })}
        >
          SESSION_ID: {session.id} | SUBJECT_REF: {entityId}
        </p>
      </header>

    
      <div className={css({ fontFamily: "mono", color: "white/50" })}>
       chat...
      </div>
    </main>
  );
}
