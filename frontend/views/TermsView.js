import { useNavigation } from "@react-navigation/native";
import React, {useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";

export function TermsView({navigation}) {

  return (
    <View style={styles.screen}>
      <Text style={{fontWeight: "bold",padding:3}}>Terms and Conditons Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
});
