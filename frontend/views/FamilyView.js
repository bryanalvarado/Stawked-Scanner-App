import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ManageFamily } from "../components/ManageFamily";

export function FamilyView() {
  return (
    <View style={styles.screen}>
      <ManageFamily />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
