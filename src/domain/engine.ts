import type {
  ActionDefinition,
  AppliedEffect,
  Character,
  EventDefinition,
  EventLog,
  NeedEffect,
  Needs,
  NeedValue
} from "./types";

const MIN_NEED_VALUE = 0;
const MAX_NEED_VALUE = 100;

export function clampNeedValue(value: number): NeedValue {
  return Math.min(MAX_NEED_VALUE, Math.max(MIN_NEED_VALUE, value));
}

export function applyEffectsToNeeds(
  needs: Needs,
  effects: readonly NeedEffect[]
): {
  needs: Needs;
  appliedEffects: readonly AppliedEffect[];
} {
  return effects.reduce(
    (result, effect) => {
      const previousValue = result.needs[effect.need];
      const nextValue = clampNeedValue(previousValue + effect.delta);

      return {
        needs: {
          ...result.needs,
          [effect.need]: nextValue
        },
        appliedEffects: [
          ...result.appliedEffects,
          {
            need: effect.need,
            delta: effect.delta,
            previousValue,
            nextValue
          }
        ]
      };
    },
    {
      needs: { ...needs },
      appliedEffects: [] as AppliedEffect[]
    }
  );
}

export function createEventLog(
  event: EventDefinition,
  appliedEffects: readonly AppliedEffect[],
  occurredAt: string
): EventLog {
  return {
    actionId: event.actionId,
    eventId: event.id,
    occurredAt,
    appliedEffects
  };
}

export function applyEvent(
  character: Character,
  event: EventDefinition,
  occurredAt: string
): {
  character: Character;
  eventLog: EventLog;
} {
  const result = applyEffectsToNeeds(character.needs, event.effects);

  return {
    character: {
      ...character,
      needs: result.needs
    },
    eventLog: createEventLog(event, result.appliedEffects, occurredAt)
  };
}

export function findEventDefinitionForAction(
  action: ActionDefinition,
  events: readonly EventDefinition[]
): EventDefinition | undefined {
  return events.find(
    (event) => event.id === action.eventId && event.actionId === action.id
  );
}

export function applyAction(
  character: Character,
  action: ActionDefinition,
  events: readonly EventDefinition[],
  occurredAt: string
):
  | {
      character: Character;
      eventLog: EventLog;
    }
  | undefined {
  const event = findEventDefinitionForAction(action, events);

  if (!event) {
    return undefined;
  }

  return applyEvent(character, event, occurredAt);
}

export function resolveCharacterState(
  initialCharacterState: Character,
  eventLogs: readonly EventLog[]
): Character {
  return eventLogs.reduce((character, eventLog) => {
    const effects = eventLog.appliedEffects.map((effect) => ({
      need: effect.need,
      delta: effect.delta
    }));

    return {
      ...character,
      needs: applyEffectsToNeeds(character.needs, effects).needs
    };
  }, initialCharacterState);
}
