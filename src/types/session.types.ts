export type SessionType = {
  id: number;
  userId: string;
  entityId: number;
  active: boolean;
  success: boolean;
  attempts: number;
  xp: number;
  createdAt: Date;
  updatedAt: Date;
};
