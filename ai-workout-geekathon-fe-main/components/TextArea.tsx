import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import Colors from "@/constants/Colors";

type TextAreaProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={5}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    height: 100,
    borderColor: Colors.light.borderColor,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.light.inputBackground,
    textAlignVertical: "top",
  },
});

export default TextArea;
