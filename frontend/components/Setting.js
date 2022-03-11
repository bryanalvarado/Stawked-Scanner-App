import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
// /{...styles.settingCard, ...styles.navBarShadow, ...props.style}
const Setting = (props) => {
  return (
    <TouchableHighlight
      style={{ ...myStyles.setting, ...myStyles.topSetting, ...props.style }}
      underlayColor={3}
      onPress={props.onClick}
    >
      <View style={myStyles.settingName}>
        <Text style={{ ...myStyles.settingNameText, ...props.textStyle }}>
          {props.settingName}
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
