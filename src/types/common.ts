export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SessionPayload = {
  email: string;
  expiresAt: Date;
};

export type ValidationResultType<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      errors: Record<string, string>[];
    };

export type ContextType = { params: Promise<{ id: string; task_id?: string }> };
