import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { actionDefinitions } from "../../domain";
import type { AppliedEffect, EventLog, NeedKey, Needs } from "../../domain";
import { useGameStore } from "../../state/useGameStore";

export function LifeScreen() {
  const character = useGameStore((state) => state.character);
  const lastEventLog = useGameStore((state) => state.lastEventLog);
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
