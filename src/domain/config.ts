import type {
  ActionDefinition,
  Character,
  EventDefinition,
  Needs,
  RoomObjectDefinition,
  TraitDefinition
} from "./types";

export const initialNeeds: Needs = {
  health: 50,
  energy: 50,
  mood: 50,
  social: 50,
  intellect: 50,
  purpose: 50
};

export const initialCharacter: Character = {
  id: "alter-ego",
  needs: initialNeeds
};

export const actionDefinitions: readonly ActionDefinition[] = [
  {
    id: "smoked_cigarette",
    label: "Fumé un cigarro",
    eventId: "smoked_cigarette_registered"
  },
  {
    id: "walked",
    label: "Caminé",
    eventId: "walked_registered"
  },
  {
    id: "intense_exercise",
    label: "Hice ejercicio intenso",
    eventId: "intense_exercise_registered"
  },
  {
    id: "slept_well",
    label: "Dormí bien",
    eventId: "slept_well_registered"
  },
  {
    id: "slept_poorly",
    label: "Dormí mal",
    eventId: "slept_poorly_registered"
  },
  {
    id: "read_or_studied",
    label: "Leí o estudié",
    eventId: "read_or_studied_registered"
  },
  {
    id: "advanced_personal_project",
    label: "Avancé un proyecto personal",
    eventId: "advanced_personal_project_registered"
  },
  {
    id: "spent_time_with_family",
    label: "Pasé tiempo con familia",
    eventId: "spent_time_with_family_registered"
  },
  {
    id: "saw_friends_or_partner",
    label: "Vi amigos o pareja",
    eventId: "saw_friends_or_partner_registered"
  },
  {
    id: "played_or_hobby",
    label: "Jugué o hice un hobby",
    eventId: "played_or_hobby_registered"
  },
  {
    id: "ate_healthy",
    label: "Comí saludable",
    eventId: "ate_healthy_registered"
  },
  {
    id: "ate_poorly",
    label: "Comí mal",
    eventId: "ate_poorly_registered"
  }
];

export const eventDefinitions: readonly EventDefinition[] = [
  {
    id: "smoked_cigarette_registered",
    actionId: "smoked_cigarette",
    traitCategories: ["smoking"],
    effects: [
      { need: "health", delta: -12 },
      { need: "energy", delta: -4 },
      { need: "mood", delta: -4 },
      { need: "purpose", delta: -3 }
    ]
  },
  {
    id: "walked_registered",
    actionId: "walked",
    traitCategories: ["physical"],
    effects: [
      { need: "health", delta: 8 },
      { need: "energy", delta: -5 },
      { need: "mood", delta: 3 }
    ]
  },
  {
    id: "intense_exercise_registered",
    actionId: "intense_exercise",
    traitCategories: ["physical"],
    effects: [
      { need: "health", delta: 14 },
      { need: "energy", delta: -14 },
      { need: "mood", delta: 4 },
      { need: "purpose", delta: 3 }
    ]
  },
  {
    id: "slept_well_registered",
    actionId: "slept_well",
    effects: [
      { need: "energy", delta: 18 },
      { need: "health", delta: 6 },
      { need: "mood", delta: 4 }
    ]
  },
  {
    id: "slept_poorly_registered",
    actionId: "slept_poorly",
    effects: [
      { need: "energy", delta: -16 },
      { need: "mood", delta: -6 },
      { need: "health", delta: -4 },
      { need: "intellect", delta: -2 }
    ]
  },
  {
    id: "read_or_studied_registered",
    actionId: "read_or_studied",
    traitCategories: ["learning"],
    effects: [
      { need: "intellect", delta: 8 },
      { need: "energy", delta: -2 },
      { need: "mood", delta: 2 },
      { need: "purpose", delta: 3 }
    ]
  },
  {
    id: "advanced_personal_project_registered",
    actionId: "advanced_personal_project",
    traitCategories: ["project"],
    effects: [
      { need: "purpose", delta: 10 },
      { need: "intellect", delta: 4 },
      { need: "energy", delta: -6 },
      { need: "mood", delta: 4 }
    ]
  },
  {
    id: "spent_time_with_family_registered",
    actionId: "spent_time_with_family",
    traitCategories: ["social"],
    effects: [
      { need: "social", delta: 10 },
      { need: "mood", delta: 10 },
      { need: "energy", delta: -4 }
    ]
  },
  {
    id: "saw_friends_or_partner_registered",
    actionId: "saw_friends_or_partner",
    traitCategories: ["social"],
    effects: [
      { need: "social", delta: 12 },
      { need: "mood", delta: 12 },
      { need: "energy", delta: -6 }
    ]
  },
  {
    id: "played_or_hobby_registered",
    actionId: "played_or_hobby",
    effects: [
      { need: "mood", delta: 10 },
      { need: "energy", delta: -4 },
      { need: "social", delta: 3 }
    ]
  },
  {
    id: "ate_healthy_registered",
    actionId: "ate_healthy",
    effects: [
      { need: "health", delta: 8 },
      { need: "energy", delta: 4 },
      { need: "mood", delta: 2 }
    ]
  },
  {
    id: "ate_poorly_registered",
    actionId: "ate_poorly",
    effects: [
      { need: "health", delta: -8 },
      { need: "energy", delta: -4 },
      { need: "mood", delta: -2 }
    ]
  }
];

export const traitDefinitions: readonly TraitDefinition[] = [
  {
    id: "reader",
    label: "Lector",
    target: 3,
    roomObjectId: "library",
    eventCategories: ["learning"],
    inactivityResetDays: 7,
    kind: "event_count"
  },
  {
    id: "active",
    label: "Activo",
    target: 3,
    roomObjectId: "bicycle",
    eventCategories: ["physical"],
    inactivityResetDays: 7,
    kind: "event_count"
  },
  {
    id: "former_smoker",
    label: "Exfumador",
    target: 30,
    roomObjectId: "former_smoker_trophy",
    eventCategories: ["smoking"],
    kind: "days_without_event"
  },
  {
    id: "constant",
    label: "Constante",
    target: 3,
    roomObjectId: "project_desk",
    eventCategories: ["project"],
    inactivityResetDays: 7,
    kind: "event_count"
  },
  {
    id: "sociable",
    label: "Sociable",
    target: 3,
    roomObjectId: "social_table",
    eventCategories: ["social"],
    inactivityResetDays: 7,
    kind: "event_count"
  }
];

export const roomObjectDefinitions: readonly RoomObjectDefinition[] = [
  {
    id: "library",
    traitId: "reader",
    label: "Biblioteca"
  },
  {
    id: "bicycle",
    traitId: "active",
    label: "Bicicleta"
  },
  {
    id: "former_smoker_trophy",
    traitId: "former_smoker",
    label: "Trofeo Exfumador"
  },
  {
    id: "project_desk",
    traitId: "constant",
    label: "Mesa de Proyectos"
  },
  {
    id: "social_table",
    traitId: "sociable",
    label: "Mesa Social"
  }
];
