import type {
  ActionDefinition,
  AppliedEffect,
  Character,
  EventDefinition,
  EventLog,
  NeedEffect,
  Needs,
  NeedValue,
  RoomObject,
  RoomObjectDefinition,
  TraitDefinition,
  TraitEventCategory,
  TraitState
} from "./types";

const MIN_NEED_VALUE = 0;
const MAX_NEED_VALUE = 100;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

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

function getLocalCalendarDay(value: string | Date): number {
  const date = typeof value === "string" ? new Date(value) : value;

  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY;
}

function getCalendarDayDistance(from: string | Date, to: string | Date): number {
  return getLocalCalendarDay(to) - getLocalCalendarDay(from);
}

function eventHasAnyCategory(
  eventLog: EventLog,
  events: readonly EventDefinition[],
  categories: readonly TraitEventCategory[]
): boolean {
  const event = events.find((definition) => definition.id === eventLog.eventId);

  return (
    event?.traitCategories?.some((category) => categories.includes(category)) ??
    false
  );
}

function getRelevantEventLogs(
  eventLogs: readonly EventLog[],
  events: readonly EventDefinition[],
  categories: readonly TraitEventCategory[]
): readonly EventLog[] {
  return eventLogs
    .filter((eventLog) => eventHasAnyCategory(eventLog, events, categories))
    .sort(
      (left, right) =>
        new Date(left.occurredAt).getTime() - new Date(right.occurredAt).getTime()
    );
}

function calculateEventCountTraitState(
  definition: TraitDefinition,
  eventLogs: readonly EventLog[],
  events: readonly EventDefinition[],
  currentDate: Date
): TraitState {
  const relevantLogs = getRelevantEventLogs(
    eventLogs,
    events,
    definition.eventCategories
  );

  if (relevantLogs.length === 0) {
    return createEmptyTraitState(definition);
  }

  const resetDays = definition.inactivityResetDays ?? 7;
  const streakLogs = relevantLogs.reduce<EventLog[]>((streak, eventLog) => {
    const previousLog = streak[streak.length - 1];

    if (
      previousLog &&
      getCalendarDayDistance(previousLog.occurredAt, eventLog.occurredAt) >=
        resetDays
    ) {
      return [eventLog];
    }

    return [...streak, eventLog];
  }, []);

  const lastRelevantEventAt = relevantLogs[relevantLogs.length - 1].occurredAt;
  const daysSinceLastEvent = getCalendarDayDistance(
    lastRelevantEventAt,
    currentDate
  );
  const isExpired = daysSinceLastEvent >= resetDays;
  const progress = isExpired ? 0 : Math.min(streakLogs.length, definition.target);

  return {
    id: definition.id,
    progress,
    target: definition.target,
    isVisible: true,
    isUnlocked: progress >= definition.target,
    daysRemaining: Math.max(definition.target - progress, 0),
    lastRelevantEventAt
  };
}

function calculateDaysWithoutEventTraitState(
  definition: TraitDefinition,
  eventLogs: readonly EventLog[],
  events: readonly EventDefinition[],
  currentDate: Date
): TraitState {
  const relevantLogs = getRelevantEventLogs(
    eventLogs,
    events,
    definition.eventCategories
  );

  if (relevantLogs.length === 0) {
    return createEmptyTraitState(definition);
  }

  const lastRelevantEventAt = relevantLogs[relevantLogs.length - 1].occurredAt;
  const daysWithoutEvent = Math.max(
    getCalendarDayDistance(lastRelevantEventAt, currentDate),
    0
  );
  const progress = Math.min(daysWithoutEvent, definition.target);

  return {
    id: definition.id,
    progress,
    target: definition.target,
    isVisible: daysWithoutEvent >= 1,
    isUnlocked: progress >= definition.target,
    daysRemaining: Math.max(definition.target - progress, 0),
    lastRelevantEventAt
  };
}

function createEmptyTraitState(definition: TraitDefinition): TraitState {
  return {
    id: definition.id,
    progress: 0,
    target: definition.target,
    isVisible: false,
    isUnlocked: false,
    daysRemaining: definition.target
  };
}

export function recalculateTraitStates(
  eventLogs: readonly EventLog[],
  events: readonly EventDefinition[],
  traits: readonly TraitDefinition[],
  currentDate: Date = new Date()
): readonly TraitState[] {
  return traits.map((definition) => {
    if (definition.kind === "days_without_event") {
      return calculateDaysWithoutEventTraitState(
        definition,
        eventLogs,
        events,
        currentDate
      );
    }

    return calculateEventCountTraitState(
      definition,
      eventLogs,
      events,
      currentDate
    );
  });
}

export function deriveRoomObjects(
  traitStates: readonly TraitState[],
  roomObjects: readonly RoomObjectDefinition[]
): readonly RoomObject[] {
  return roomObjects.map((definition) => {
    const traitState = traitStates.find(
      (state) => state.id === definition.traitId
    );

    return {
      id: definition.id,
      traitId: definition.traitId,
      label: definition.label,
      isVisible: traitState?.isVisible ?? false,
      isUnlocked: traitState?.isUnlocked ?? false,
      progress: traitState?.progress ?? 0,
      target: traitState?.target ?? 0,
      daysRemaining: traitState?.daysRemaining ?? 0
    };
  });
}
