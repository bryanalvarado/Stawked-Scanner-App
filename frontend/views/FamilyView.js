import { useNavigation } from "@react-navigation/native";
import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
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
  },
});
