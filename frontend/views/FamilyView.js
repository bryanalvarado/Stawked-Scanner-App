import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ManageTeam } from "../components/ManageTeam";

export function FamilyView() {
  return (
    <View style={styles.screen}>
      <ManageTeam />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
