import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";

type OptionItemProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const OptionItem: React.FC<OptionItemProps> = ({
  label,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.button, isActive && styles.activeButton]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

type OptionSelectorProps = {
  options: { label: string; value: string }[];
  selectedValue: string | string[];
  onSelect: (value: string | string[]) => void;
  multiple?: boolean;
};

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options,
  selectedValue,
  onSelect,
  multiple = false,
}) => {
  const handleSelect = (value: string) => {
    if (multiple) {
      const selectedArray = Array.isArray(selectedValue) ? selectedValue : [];
      if (selectedArray.includes(value)) {
        onSelect(selectedArray.filter((item) => item !== value));
      } else {
        onSelect([...selectedArray, value]);
      }
    } else {
      onSelect(value);
    }
  };

  const isSelected = (value: string) => {
    return multiple
      ? Array.isArray(selectedValue) && selectedValue.includes(value)
      : selectedValue === value;
  };

  return (
    <View style={styles.buttonContainer}>
      {options.map((option) => (
        <OptionItem
          key={option.value}
          label={option.label}
          isActive={isSelected(option.value)}
          onPress={() => handleSelect(option.value)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderColor: Colors.light.borderColor,
    borderWidth: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: Colors.light.buttonBackground,
  },
  activeButton: {
    backgroundColor: Colors.light.activeButtonBackground,
    borderColor: Colors.light.activeButtonBorder,
  },
  buttonText: {
    color: Colors.light.buttonText,
    fontWeight: "bold",
  },
  activeButtonText: {
    color: Colors.light.activeButtonText,
  },
});

export default OptionSelector;
