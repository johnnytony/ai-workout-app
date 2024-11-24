import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "@/components/Themed";
import OptionSelector from "@/components/OptionSelector";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import StyledButton from "@/components/StyledButton";
import { WorkoutData } from "@/types/Workouts";
import TextArea from "../../components/TextArea";
import Colors from "@/constants/Colors";

type RootStackParamList = {
  two: { workoutData: WorkoutData };
};

export default function TabOneScreen() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Beginner");
  const [workoutPreference, setWorkoutPreference] = useState("Home");
  const [fitnessGoal, setFitnessGoal] = useState("Weight loss");
  const [daysAvailable, setDaysAvailable] = useState<string[]>([]);
  const [availableWorkoutTime, setAvailableWorkoutTime] = useState("");
  const [injuries, setInjuries] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("upper_body");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleWorkout = async () => {
    const workoutData: WorkoutData = {
      age,
      weight,
      experienceLevel,
      workoutPreference,
      fitnessGoal,
      daysAvailable,
      availableWorkoutTime,
      injuries,
      muscleGroup,
    };
    navigation.navigate("two", { workoutData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyles.header}>
        <Text style={headerStyles.headerSubtitle}>Plan your current week</Text>
        <Text style={headerStyles.headerTitle}>Workout</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
      >
        <View>
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Age"
            value={age}
            onChangeText={setAge}
          />
          <Text style={styles.inputLabel}>Weight</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
          />

          <Text style={styles.label}>Muscle Group</Text>
          <OptionSelector
            options={[
              { label: "Upper Body", value: "upper_body" },
              { label: "Lower Body", value: "lower_body" },
              { label: "Full Body", value: "full_body" },
            ]}
            selectedValue={muscleGroup}
            onSelect={(value) => setMuscleGroup(value as string)}
          />

          <Text style={styles.label}>Experience level</Text>
          <OptionSelector
            options={[
              { label: "Beginner", value: "Beginner" },
              { label: "Intermediate", value: "Intermediate" },
              { label: "Advanced", value: "Advanced" },
            ]}
            selectedValue={experienceLevel}
            onSelect={(value) => setExperienceLevel(value as string)}
          />

          <Text style={styles.label}>Workout Preferences</Text>
          <OptionSelector
            options={[
              { label: "Home", value: "Home" },
              { label: "Gym", value: "Gym" },
              { label: "Outdoor", value: "Outdoor" },
            ]}
            selectedValue={workoutPreference}
            onSelect={(value) => setWorkoutPreference(value as string)}
          />

          <Text style={styles.label}>Fitness Goal</Text>
          <OptionSelector
            options={[
              { label: "Weight loss", value: "Weight loss" },
              { label: "Muscle gain", value: "Muscle gain" },
            ]}
            selectedValue={fitnessGoal}
            onSelect={(value) => setFitnessGoal(value as string)}
          />

          <Text style={styles.inputLabel}>Available Workout Time</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Available Workout Time"
            value={availableWorkoutTime}
            onChangeText={setAvailableWorkoutTime}
          />

          <Text style={styles.label}>Days Available</Text>
          <ScrollView horizontal>
            <OptionSelector
              options={[
                { label: "Monday", value: "Monday" },
                { label: "Tuesday", value: "Tuesday" },
                { label: "Wednesday", value: "Wednesday" },
                { label: "Thursday", value: "Thursday" },
                { label: "Friday", value: "Friday" },
                { label: "Saturday", value: "Saturday" },
                { label: "Sunday", value: "Sunday" },
              ]}
              selectedValue={daysAvailable}
              onSelect={(value) => setDaysAvailable(value as string[])}
              multiple={true}
            />
          </ScrollView>
          <Text style={styles.inputLabel}>Injuries</Text>
          <TextArea
            value={injuries}
            onChangeText={setInjuries}
            placeholder="Enter any injuries here"
          />
          <StyledButton title="Workout!" onPress={handleWorkout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
});

const headerStyles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 8,
  },
});
