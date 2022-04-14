import { useNavigation } from "@react-navigation/native";
import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";

export function PolicyView({navigation}) {

  return (
    <View style={styles.screen}>
      <Text style={{fontWeight: "bold",padding:3}}>You are using version 1.00.00 of Stawked</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
});
