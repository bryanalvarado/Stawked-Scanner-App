import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function UserSettingsView() {
  return (
    <View style={styles.screen}>
      <Text>User Settings.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
