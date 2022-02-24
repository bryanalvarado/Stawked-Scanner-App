import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserSettingsView = (props) => {
  return (
    <View style={styles.screen}>
      <Text>User Settings.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default UserSettingsView;
