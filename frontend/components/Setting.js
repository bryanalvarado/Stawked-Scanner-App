import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Image,} from "react-native";
// /{...styles.settingCard, ...styles.navBarShadow, ...props.style}



const Setting = (props) => {

  var assetImages = [
    require("../assets/img/logout.png"), 
    require("../assets/img/user.png"),
    require("../assets/img/password.png"),
    require("../assets/img/notification-bell.png"),
    require("../assets/img/about.png"),
  ];


  //props.imagValue
  
    
    
    return (
    
      <TouchableHighlight
        style={{ ...myStyles.setting, ...props.style }}
        underlayColor={3}
        onPress={props.onClick}
      >
        
        <View style={myStyles.settingName}>
        
          <Text>
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
          </Text>
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
  },
  settingNameText: {
    fontSize: 20,
  },
});

export default Setting;
