import { notFound } from "next/navigation"; 
import { getOrCreateSession } from "@/app/actions/session";
import ChatLayout from "@/components/chat/layout/layout";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entityId = parseInt(id);

  if (isNaN(entityId)) return notFound();

  const session = await getOrCreateSession(entityId);
    
  return <ChatLayout />;
}
