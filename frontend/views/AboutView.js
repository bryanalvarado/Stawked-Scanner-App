import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements';

export function AboutView({navigation}) 
{
  const nav = useNavigation()
  return (
    <View style={styles.screen}>
        <ListItem
                onPress={() => {nav.navigate("Policy")}}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>Policy</ListItem.Title>
                </ListItem.Content>
        </ListItem> 
        <ListItem
                onPress={() => {nav.navigate("Terms")}}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>Terms and Conditions</ListItem.Title>
                </ListItem.Content>
        </ListItem> 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white'
  },
});
