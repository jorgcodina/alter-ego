import { create } from "zustand";

import {
  actionDefinitions,
  applyAction,
  eventDefinitions,
  initialCharacter
} from "../domain";
import type { Character, EventLog } from "../domain";

type RegisterActionResult = {
  character: Character;
  eventLog: EventLog;
};

type GameState = {
  character: Character;
  eventLogs: EventLog[];
  lastEventLog: EventLog | undefined;
  registerAction: (actionId: string) => RegisterActionResult | undefined;
};

function createInitialCharacter(): Character {
  return {
    ...initialCharacter,
    needs: { ...initialCharacter.needs }
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  character: createInitialCharacter(),
  eventLogs: [],
  lastEventLog: undefined,
  registerAction: (actionId) => {
    const action = actionDefinitions.find(
      (definition) => definition.id === actionId
    );

    if (!action) {
      return undefined;
    }

    const result = applyAction(
      get().character,
      action,
      eventDefinitions,
      new Date().toISOString()
    );

    if (!result) {
      return undefined;
    }

    set((state) => ({
      character: result.character,
      eventLogs: [...state.eventLogs, result.eventLog],
      lastEventLog: result.eventLog
    }));

    return result;
  }
}));
