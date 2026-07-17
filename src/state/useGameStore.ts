import { create } from "zustand";

import {
  actionDefinitions,
  applyAction,
  deriveRoomObjects,
  eventDefinitions,
  initialCharacter,
  recalculateTraitStates,
  roomObjectDefinitions,
  traitDefinitions
} from "../domain";
import type { Character, EventLog, RoomObject, TraitState } from "../domain";

type RegisterActionResult = {
  character: Character;
  eventLog: EventLog;
  traitStates: readonly TraitState[];
  roomObjects: readonly RoomObject[];
};

type GameState = {
  character: Character;
  eventLogs: EventLog[];
  traitStates: readonly TraitState[];
  roomObjects: readonly RoomObject[];
  lastEventLog: EventLog | undefined;
  registerAction: (actionId: string) => RegisterActionResult | undefined;
  recalculateTraits: () => {
    traitStates: readonly TraitState[];
    roomObjects: readonly RoomObject[];
  };
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
  traitStates: recalculateTraitStates([], eventDefinitions, traitDefinitions),
  roomObjects: deriveRoomObjects(
    recalculateTraitStates([], eventDefinitions, traitDefinitions),
    roomObjectDefinitions
  ),
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

    const eventLogs = [...get().eventLogs, result.eventLog];
    const traitStates = recalculateTraitStates(
      eventLogs,
      eventDefinitions,
      traitDefinitions
    );
    const roomObjects = deriveRoomObjects(traitStates, roomObjectDefinitions);

    set({
      character: result.character,
      eventLogs,
      traitStates,
      roomObjects,
      lastEventLog: result.eventLog
    });

    return {
      ...result,
      traitStates,
      roomObjects
    };
  },
  recalculateTraits: () => {
    const traitStates = recalculateTraitStates(
      get().eventLogs,
      eventDefinitions,
      traitDefinitions
    );
    const roomObjects = deriveRoomObjects(traitStates, roomObjectDefinitions);

    set({
      traitStates,
      roomObjects
    });

    return {
      traitStates,
      roomObjects
    };
  }
}));
