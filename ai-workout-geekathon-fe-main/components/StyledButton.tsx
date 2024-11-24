import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

type StyledButtonProps = {
  title: string;
  onPress: () => void;
};

const StyledButton: React.FC<StyledButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity
    style={[styles.styledButton, styles.workoutButton]}
    onPress={onPress}
  >
    <Text style={styles.styledButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  styledButton: {
    backgroundColor: Colors.light.activeButtonBackground,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  workoutButton: {
    marginTop: 20,
  },
  styledButtonText: {
    color: Colors.light.activeButtonText,
    fontSize: 16,
  },
});

export default StyledButton;
