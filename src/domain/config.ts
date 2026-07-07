import type { ActionDefinition, Character, EventDefinition, Needs } from "./types";

export const initialNeeds: Needs = {
  energy: 50,
  mood: 50,
  health: 50
};

export const initialCharacter: Character = {
  id: "alter-ego",
  needs: initialNeeds
};

export const actionDefinitions: readonly ActionDefinition[] = [
  {
    id: "rest",
    label: "Descansar",
    eventId: "rest_completed"
  },
  {
    id: "move",
    label: "Moverse",
    eventId: "movement_completed"
  },
  {
    id: "connect",
    label: "Conectar",
    eventId: "connection_completed"
  }
];

export const eventDefinitions: readonly EventDefinition[] = [
  {
    id: "rest_completed",
    actionId: "rest",
    effects: [
      { need: "energy", delta: 20 },
      { need: "health", delta: 5 }
    ]
  },
  {
    id: "movement_completed",
    actionId: "move",
    effects: [
      { need: "health", delta: 15 },
      { need: "energy", delta: -10 }
    ]
  },
  {
    id: "connection_completed",
    actionId: "connect",
    effects: [
      { need: "mood", delta: 15 },
      { need: "energy", delta: -5 }
    ]
  }
];
