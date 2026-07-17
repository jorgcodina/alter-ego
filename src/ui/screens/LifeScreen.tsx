import { useState } from "react";
import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { actionDefinitions, traitDefinitions } from "../../domain";
import type {
  AppliedEffect,
  EventLog,
  NeedKey,
  Needs,
  RoomObject,
  RoomObjectId,
  TraitId,
  TraitState
} from "../../domain";
import { useGameStore } from "../../state/useGameStore";

export function LifeScreen() {
  const [selectedMedalId, setSelectedMedalId] = useState<string | undefined>();
  const character = useGameStore((state) => state.character);
  const lastEventLog = useGameStore((state) => state.lastEventLog);
  const traitStates = useGameStore((state) => state.traitStates);
  const roomObjects = useGameStore((state) => state.roomObjects);
  const registerAction = useGameStore((state) => state.registerAction);

  const lastAction = lastEventLog
    ? actionDefinitions.find((action) => action.id === lastEventLog.actionId)
    : undefined;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.appTitle}>Alter Ego MVP</Text>
        <View style={styles.characterHeader}>
          <Text style={styles.avatar}>😀</Text>
          <View style={styles.characterCopy}>
            <Text style={styles.characterName}>Jorge</Text>
            <Text style={styles.characterState}>🙂 Equilibrado</Text>
          </View>
        </View>
        <AvatarMedalsPanel
          traitStates={traitStates}
          roomObjects={roomObjects}
          selectedMedalId={selectedMedalId}
          onSelectMedal={setSelectedMedalId}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Necesidades</Text>
        {needEntries(character.needs).map(([need, value]) => (
          <NeedBar key={need} need={need} value={value} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registrar Evento</Text>
        <View style={styles.actions}>
          {actionDefinitions.map((action) => (
            <Pressable
              key={action.id}
              accessibilityRole="button"
              onPress={() => registerAction(action.id)}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed
              ]}
            >
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        {lastEventLog ? (
          <Feedback
            eventLog={lastEventLog}
            actionLabel={lastAction?.label ?? "Acción registrada"}
            needs={character.needs}
          />
        ) : (
          <Text style={styles.emptyFeedback}>
            Registra una acción para ver qué cambió.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

type AvatarMedalsPanelProps = {
  traitStates: readonly TraitState[];
  roomObjects: readonly RoomObject[];
  selectedMedalId: string | undefined;
  onSelectMedal: (medalId: string | undefined) => void;
};

function AvatarMedalsPanel({
  traitStates,
  roomObjects,
  selectedMedalId,
  onSelectMedal
}: AvatarMedalsPanelProps) {
  const visibleTraits = traitStates.filter((traitState) => traitState.isVisible);
  const visibleObjects = roomObjects.filter((roomObject) => roomObject.isVisible);
  const selectedTrait = visibleTraits.find(
    (traitState) => getTraitMedalId(traitState.id) === selectedMedalId
  );
  const selectedObject = visibleObjects.find(
    (roomObject) => getObjectMedalId(roomObject.id) === selectedMedalId
  );
  const hasVisibleMedals =
    visibleTraits.length > 0 || visibleObjects.length > 0;

  return (
    <View style={styles.medalsPanel}>
      <Text style={styles.smallTitle}>Medallas</Text>
      {hasVisibleMedals ? (
        <View style={styles.medalGroups}>
          {visibleTraits.length > 0 ? (
            <MedalGroup title="Rasgos">
              {visibleTraits.map((traitState) => (
                <MedalButton
                  key={traitState.id}
                  label={getTraitLabel(traitState.id)}
                  emoji={traitEmoji[traitState.id]}
                  progress={traitState.progress}
                  target={traitState.target}
                  isUnlocked={traitState.isUnlocked}
                  isSelected={
                    selectedMedalId === getTraitMedalId(traitState.id)
                  }
                  onPress={() =>
                    toggleSelectedMedal(
                      getTraitMedalId(traitState.id),
                      selectedMedalId,
                      onSelectMedal
                    )
                  }
                />
              ))}
            </MedalGroup>
          ) : null}

          {visibleObjects.length > 0 ? (
            <MedalGroup title="Objetos">
              {visibleObjects.map((roomObject) => (
                <MedalButton
                  key={roomObject.id}
                  label={roomObject.label}
                  emoji={objectEmoji[roomObject.id] ?? "🏅"}
                  progress={roomObject.progress}
                  target={roomObject.target}
                  isUnlocked={roomObject.isUnlocked}
                  isSelected={
                    selectedMedalId === getObjectMedalId(roomObject.id)
                  }
                  onPress={() =>
                    toggleSelectedMedal(
                      getObjectMedalId(roomObject.id),
                      selectedMedalId,
                      onSelectMedal
                    )
                  }
                />
              ))}
            </MedalGroup>
          ) : null}
        </View>
      ) : (
        <Text style={styles.emptyFeedback}>
          Registra acciones para descubrir medallas.
        </Text>
      )}

      {selectedTrait ? (
        <MedalDetail
          title={getTraitLabel(selectedTrait.id)}
          progress={selectedTrait.progress}
          target={selectedTrait.target}
          isUnlocked={selectedTrait.isUnlocked}
          detail={formatTraitDetail(selectedTrait)}
        />
      ) : null}

      {selectedObject ? (
        <MedalDetail
          title={selectedObject.label}
          progress={selectedObject.progress}
          target={selectedObject.target}
          isUnlocked={selectedObject.isUnlocked}
          detail={`Faltan ${selectedObject.daysRemaining} para completarlo.`}
        />
      ) : null}
    </View>
  );
}

type MedalGroupProps = {
  title: string;
  children: ReactNode;
};

function MedalGroup({ title, children }: MedalGroupProps) {
  return (
    <View style={styles.medalGroup}>
      <Text style={styles.medalGroupTitle}>{title}</Text>
      <View style={styles.medalList}>{children}</View>
    </View>
  );
}

type MedalButtonProps = {
  label: string;
  emoji: string;
  progress: number;
  target: number;
  isUnlocked: boolean;
  isSelected: boolean;
  onPress: () => void;
};

function MedalButton({
  label,
  emoji,
  progress,
  target,
  isUnlocked,
  isSelected,
  onPress
}: MedalButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.medalButton,
        isUnlocked && styles.medalButtonUnlocked,
        isSelected && styles.medalButtonSelected,
        pressed && styles.actionButtonPressed
      ]}
    >
      <Text style={styles.medalEmoji}>{emoji}</Text>
      <Text numberOfLines={1} style={styles.medalLabel}>
        {label}
      </Text>
      <Text style={styles.medalProgress}>
        {progress}/{target}
      </Text>
      <ProgressBar progress={progress} target={target} />
    </Pressable>
  );
}

type MedalDetailProps = {
  title: string;
  progress: number;
  target: number;
  isUnlocked: boolean;
  detail: string;
};

function MedalDetail({
  title,
  progress,
  target,
  isUnlocked,
  detail
}: MedalDetailProps) {
  return (
    <View style={styles.medalDetail}>
      <Text style={styles.objectTitle}>{title}</Text>
      <Text style={styles.objectState}>
        {isUnlocked ? "Desbloqueado" : "En progreso"}
      </Text>
      <ProgressBar progress={progress} target={target} />
      <Text style={styles.stateText}>
        Progreso: {progress}/{target}
      </Text>
      <Text style={styles.stateText}>{detail}</Text>
    </View>
  );
}

type ProgressBarProps = {
  progress: number;
  target: number;
};

function ProgressBar({ progress, target }: ProgressBarProps) {
  const percentage = target > 0 ? Math.min((progress / target) * 100, 100) : 0;

  return (
    <View style={styles.barTrack}>
      <View style={[styles.barFill, { width: `${percentage}%` }]} />
    </View>
  );
}

type NeedBarProps = {
  need: NeedKey;
  value: number;
};

function NeedBar({ need, value }: NeedBarProps) {
  return (
    <View style={styles.needBlock}>
      <View style={styles.needHeader}>
        <Text style={styles.needLabel}>
          {needMeta[need].emoji} {needMeta[need].label}
        </Text>
        <Text style={styles.needValue}>{value}</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${value}%` }]} />
      </View>
    </View>
  );
}

type FeedbackProps = {
  eventLog: EventLog;
  actionLabel: string;
  needs: Needs;
};

function Feedback({ eventLog, actionLabel, needs }: FeedbackProps) {
  const positiveEffects = eventLog.appliedEffects.filter(
    (effect) => effect.delta > 0
  );
  const negativeEffects = eventLog.appliedEffects.filter(
    (effect) => effect.delta < 0
  );

  return (
    <View style={styles.feedback}>
      <Text style={styles.feedbackTitle}>Último feedback</Text>
      <Text style={styles.feedbackAction}>{actionLabel}</Text>

      <EffectSection title="Cambios positivos" effects={positiveEffects} />
      <EffectSection title="Cambios negativos" effects={negativeEffects} />

      <View style={styles.stateSection}>
        <Text style={styles.smallTitle}>Estado actualizado</Text>
        {needEntries(needs).map(([need, value]) => (
          <Text key={need} style={styles.stateText}>
            {needMeta[need].label}: {value}
          </Text>
        ))}
      </View>
    </View>
  );
}

type EffectSectionProps = {
  title: string;
  effects: readonly AppliedEffect[];
};

function EffectSection({ title, effects }: EffectSectionProps) {
  return (
    <View style={styles.effectSection}>
      <Text style={styles.smallTitle}>{title}</Text>
      {effects.length > 0 ? (
        effects.map((effect) => (
          <Text key={`${effect.need}-${effect.delta}`} style={styles.effectText}>
            {needMeta[effect.need].label} {formatDelta(effect.delta)}
          </Text>
        ))
      ) : (
        <Text style={styles.mutedText}>Sin cambios.</Text>
      )}
    </View>
  );
}

const needMeta: Record<NeedKey, { label: string; emoji: string }> = {
  health: { label: "Salud", emoji: "❤️" },
  energy: { label: "Energía", emoji: "⚡" },
  mood: { label: "Ánimo", emoji: "🙂" },
  social: { label: "Social", emoji: "👥" },
  intellect: { label: "Intelecto", emoji: "🧠" },
  purpose: { label: "Propósito", emoji: "🎯" }
};

function formatDelta(delta: number): string {
  return delta > 0 ? `+${delta}` : `${delta}`;
}

function needEntries(needs: Needs): Array<[NeedKey, number]> {
  return Object.entries(needs) as Array<[NeedKey, number]>;
}

function getTraitLabel(traitId: TraitId): string {
  return (
    traitDefinitions.find((traitDefinition) => traitDefinition.id === traitId)
      ?.label ?? "Rasgo"
  );
}

function formatTraitDetail(traitState: TraitState): string {
  if (traitState.id === "former_smoker") {
    return `Faltan ${traitState.daysRemaining} días sin fumar.`;
  }

  return `Faltan ${traitState.daysRemaining} eventos.`;
}

function getTraitMedalId(traitId: TraitId): string {
  return `trait-${traitId}`;
}

function getObjectMedalId(objectId: RoomObjectId): string {
  return `object-${objectId}`;
}

function toggleSelectedMedal(
  medalId: string,
  selectedMedalId: string | undefined,
  onSelectMedal: (medalId: string | undefined) => void
) {
  onSelectMedal(selectedMedalId === medalId ? undefined : medalId);
}

const traitEmoji: Record<TraitId, string> = {
  reader: "📚",
  active: "💪",
  former_smoker: "🏅",
  constant: "🛠️",
  sociable: "🤝"
};

const objectEmoji: Record<RoomObjectId, string> = {
  library: "📚",
  bicycle: "🚲",
  former_smoker_trophy: "🏆",
  project_desk: "🧰",
  social_table: "🪑"
};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: "#f3f4f6",
    borderColor: "#9ca3af",
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 14
  },
  actionButtonPressed: {
    backgroundColor: "#e5e7eb"
  },
  actionText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  actions: {
    gap: 10
  },
  appTitle: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800"
  },
  avatar: {
    fontSize: 36
  },
  barFill: {
    backgroundColor: "#111827",
    height: "100%"
  },
  barTrack: {
    backgroundColor: "#d1d5db",
    height: 16,
    overflow: "hidden"
  },
  characterCopy: {
    gap: 8
  },
  characterHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14
  },
  characterName: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800"
  },
  characterState: {
    color: "#111827",
    fontSize: 18
  },
  container: {
    backgroundColor: "#fef3c7",
    gap: 18,
    padding: 18,
    paddingBottom: 40
  },
  effectSection: {
    gap: 5
  },
  effectText: {
    color: "#1f2937",
    fontSize: 15
  },
  emptyFeedback: {
    color: "#374151",
    fontSize: 15
  },
  feedback: {
    gap: 12
  },
  feedbackAction: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700"
  },
  feedbackTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800"
  },
  mutedText: {
    color: "#6b7280",
    fontSize: 15
  },
  medalButton: {
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderColor: "#9ca3af",
    borderRadius: 6,
    borderWidth: 1,
    gap: 5,
    minHeight: 112,
    padding: 8,
    width: 96
  },
  medalButtonSelected: {
    borderColor: "#111827",
    borderWidth: 2
  },
  medalButtonUnlocked: {
    backgroundColor: "#ecfdf5",
    borderColor: "#047857"
  },
  medalDetail: {
    borderColor: "#d1d5db",
    borderTopWidth: 1,
    gap: 7,
    paddingTop: 12
  },
  medalEmoji: {
    fontSize: 28
  },
  medalGroup: {
    gap: 8
  },
  medalGroupTitle: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "800"
  },
  medalGroups: {
    gap: 14
  },
  medalLabel: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
    maxWidth: "100%",
    textAlign: "center"
  },
  medalList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  medalProgress: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "700"
  },
  medalsPanel: {
    borderColor: "#d1d5db",
    borderTopWidth: 1,
    gap: 12,
    paddingTop: 14
  },
  needBlock: {
    gap: 6
  },
  needHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8
  },
  needLabel: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "600"
  },
  needValue: {
    color: "#111827",
    fontSize: 18
  },
  objectButton: {
    backgroundColor: "#f9fafb",
    borderColor: "#9ca3af",
    borderRadius: 6,
    borderWidth: 1,
    gap: 8,
    padding: 12
  },
  objectButtonUnlocked: {
    backgroundColor: "#ecfdf5",
    borderColor: "#047857"
  },
  objectDetail: {
    borderColor: "#d1d5db",
    borderTopWidth: 1,
    gap: 6,
    paddingTop: 12
  },
  objectList: {
    gap: 10
  },
  objectState: {
    color: "#374151",
    fontSize: 14
  },
  objectTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800"
  },
  progressBlock: {
    gap: 8
  },
  section: {
    backgroundColor: "#ffffff",
    borderColor: "#111827",
    borderRadius: 4,
    borderWidth: 3,
    gap: 18,
    padding: 18
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800"
  },
  smallTitle: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "800"
  },
  stateSection: {
    gap: 5
  },
  stateText: {
    color: "#1f2937",
    fontSize: 15
  }
});
