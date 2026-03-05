import { notFound } from "next/navigation";
import { getOrCreateSession } from "@/app/actions/session";
import ChatLayout from "@/components/chat/layout/layout";
import { getEnrichedEntityById } from "@/app/actions/entity";
import { getChatMessages } from "@/app/actions/message";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entityId = parseInt(id);

  if (isNaN(entityId)) return notFound();

  const [session, entity] = await Promise.all([
    getOrCreateSession(entityId),
    getEnrichedEntityById(entityId),
  ]);

  const initialMessages = await getChatMessages(session.id);

  return (
    <ChatLayout
      session={session}
      entity={entity}
      initialMessages={initialMessages}
    />
  );
}
