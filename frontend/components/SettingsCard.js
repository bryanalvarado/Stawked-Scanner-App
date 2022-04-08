import React from "react";
import { View,Text } from "react-native";
import styles from "../stylesheet";

const SettingsCard = (props) => {
  return (
    <View
      style={{ ...styles.settingCard, ...styles.navBarShadow, ...props.style }}
    >
      {props.children}
      {/* <Text>hello world</Text> */}
    </View>
  );
};

export default SettingsCard;
