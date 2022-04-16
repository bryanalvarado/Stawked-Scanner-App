import React from "react";
import { View, StyleSheet } from "react-native";
import { ManageFamily } from "../components/ManageFamily";


export function FamilyView({navigation}) {


  return (
    <View style={styles.screen}>
      <ManageFamily />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
});
