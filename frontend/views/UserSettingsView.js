import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Logout } from "../components/Logout";

export function UserSettingsView() {
  return (
    <View style={styles.screen}>
      <Text>User Settings.</Text>
      <Logout />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
