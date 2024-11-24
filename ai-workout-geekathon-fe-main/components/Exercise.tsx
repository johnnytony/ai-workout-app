import { Exercise } from "@/types/Workouts";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "@/constants/Colors";

export default function ExerciseCard(exercise: Exercise) {
  const difficultyColors: { [key: string]: string } = {
    Beginner: Colors.light.success,
    Intermediate: Colors.light.warning,
    Advanced: Colors.light.danger,
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{exercise.name}</Text>
      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              difficultyColors[exercise.difficulty] || Colors.light.neutral,
          },
        ]}
      >
        <Text style={styles.badgeText}>{exercise.difficulty}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detail}>Sets: {exercise.sets}</Text>
        <Text style={styles.detail}>Reps: {exercise.reps}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.muscleGroup}>
          Targeted: {exercise.muscle_group.join(", ")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.background,
    padding: 20,
    margin: 10,
    borderRadius: 15,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: "auto",
    height: "auto",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.light.text,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 10,
  },
  badgeText: {
    color: Colors.light.badgeText,
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  detail: {
    fontSize: 16,
    color: Colors.light.detailText,
  },
  muscleGroup: {
    fontSize: 14,
    color: Colors.light.muscleGroupText,
    fontStyle: "italic",
  },
});
