import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet,Image } from "react-native";
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
                
                <View style={{paddingRight: 10}}>
                  <Image style={{height: 12, width: 12}} source={require("../assets/img/pointing-arrow.png")}></Image>
                </View>

        </ListItem> 
        <ListItem
                onPress={() => {nav.navigate("Terms")}}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>Terms and Conditions</ListItem.Title>
                </ListItem.Content>

                <View style={{paddingRight: 10}}>
                  <Image style={{height: 12, width: 12}} source={require("../assets/img/pointing-arrow.png")}></Image>
                </View>
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
