export type NeedKey = "energy" | "mood" | "health";

export type NeedValue = number;

export type Needs = Record<NeedKey, NeedValue>;

export type Character = {
  id: string;
  needs: Needs;
};

export type NeedEffect = {
  need: NeedKey;
  delta: number;
};

export type ActionDefinition = {
  id: string;
  label: string;
  eventId: string;
};

export type EventDefinition = {
  id: string;
  actionId: string;
  effects: readonly NeedEffect[];
};

export type AppliedEffect = {
  need: NeedKey;
  delta: number;
  previousValue: NeedValue;
  nextValue: NeedValue;
};

export type EventLog = {
  actionId: string;
  eventId: string;
  occurredAt: string;
  appliedEffects: readonly AppliedEffect[];
};
