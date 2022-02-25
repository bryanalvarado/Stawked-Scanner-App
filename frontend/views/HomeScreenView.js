import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Logout } from "../components/Logout";

export function HomeScreenView() {
  return (
    <View style={styles.screen}>
      <Text>Home.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
