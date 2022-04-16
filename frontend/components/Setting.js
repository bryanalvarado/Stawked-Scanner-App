import React from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image,} from "react-native";

const Setting = (props) => {

  var assetImages = [
    require("../assets/img/logout.png"), 
    require("../assets/img/user.png"),
    require("../assets/img/password.png"),
    require("../assets/img/notification-bell.png"),
    require("../assets/img/about.png"),
  ];
    
  return (
  
    <TouchableHighlight
      style={{ ...myStyles.setting, ...props.style }}
      underlayColor={3}
      onPress={props.onClick}
    >
      <View style={myStyles.settingName}>
      
        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
          <Image
                source={assetImages[props.imageValue]}
                resizeMode="contain"
                style={{
                  width: 20,
                  
                  height: 20,
                  // tintColor: focused ? "royalblue" : "#748c94",
                }}
          />
          <Text>   {props.settingName}</Text>
        </View>

        <View style={{paddingRight: 10}}>
          <Image style={{height: 12, width: 12}} source={require("../assets/img/pointing-arrow.png")}></Image>
        </View>

      </View>
    </TouchableHighlight>
  );
  
  
};
const myStyles = StyleSheet.create({
  setting: {
    borderBottomWidth: 0.7,
    borderBottomColor: "grey",
    paddingVertical: 5,
    
  },
  settingName: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingNameText: {
    fontSize: 20,
  },
});

export default Setting;
