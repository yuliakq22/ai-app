'use client';

import { create } from 'zustand';

type SessionDraft = {
  scenarioId?: string;
  startedAt?: string;
};

type SessionState = {
  draft: SessionDraft;
  setScenario: (scenarioId: string) => void;
  reset: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  draft: {},
  setScenario: (scenarioId) =>
    set({
      draft: {
        scenarioId,
        startedAt: new Date().toISOString()
      }
    }),
  reset: () => set({ draft: {} })
}));
