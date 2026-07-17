export type NeedKey =
  | "health"
  | "energy"
  | "mood"
  | "social"
  | "intellect"
  | "purpose";

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
  traitCategories?: readonly TraitEventCategory[];
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

export type TraitEventCategory =
  | "learning"
  | "physical"
  | "project"
  | "social"
  | "smoking";

export type TraitId =
  | "reader"
  | "active"
  | "former_smoker"
  | "constant"
  | "sociable";

export type RoomObjectId =
  | "library"
  | "bicycle"
  | "former_smoker_trophy"
  | "project_desk"
  | "social_table";

export type TraitDefinition = {
  id: TraitId;
  label: string;
  target: number;
  roomObjectId: RoomObjectId;
  eventCategories: readonly TraitEventCategory[];
  inactivityResetDays?: number;
  kind: "event_count" | "days_without_event";
};

export type TraitState = {
  id: TraitId;
  progress: number;
  target: number;
  isVisible: boolean;
  isUnlocked: boolean;
  daysRemaining: number;
  lastRelevantEventAt?: string;
};

export type RoomObjectDefinition = {
  id: RoomObjectId;
  traitId: TraitId;
  label: string;
};

export type RoomObject = {
  id: RoomObjectId;
  traitId: TraitId;
  label: string;
  isVisible: boolean;
  isUnlocked: boolean;
  progress: number;
  target: number;
  daysRemaining: number;
};
