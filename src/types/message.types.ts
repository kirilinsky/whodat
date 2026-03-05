export type SessionMessageType = {
  id: number;
  sessionId: number;
  bot: boolean;
  content: string;
  createdAt: Date;
};
